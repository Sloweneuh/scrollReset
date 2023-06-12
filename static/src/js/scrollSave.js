odoo.define('scrollReset.saveScrollPosition', function (require) {
    "use strict";

    var formController = require('web.FormController');
    var core = require('web.core');
    var qweb = core.qweb;

    formController.include({

        /**
         * Called when the user wants to save the current record -> @see saveRecord
         *
         * @private
         * @param {MouseEvent} ev
         */
        _onSave: function (ev) {
            var result = this._super.apply(this, arguments);

            var scrollPosition = this.$(".o_form_sheet_bg").scrollTop();
            console.log("scrollPosition: " + scrollPosition);
            console.log(this.$(".o_form_sheet_bg").scrollTop());
            var self = this;
            ev.stopPropagation(); // Prevent x2m lines to be auto-saved
            this._disableButtons();
            this.saveRecord().then(this._enableButtons.bind(this)).guardedCatch(this._enableButtons.bind(this));
            setTimeout(function () {
                if (scrollPosition > 0) {
                    console.log("scrollPosition: " + scrollPosition);
                    console.log(self.$(".o_form_sheet_bg").scrollTop());
                    self.$(".o_form_sheet_bg").scrollTop(scrollPosition);
                    console.log("scrollPosition: " + scrollPosition);
                    console.log(self.$(".o_form_sheet_bg").scrollTop());
                }
            }, 500);
            return result;

        },

        /**
         * Called when the user wants to edit the current record -> @see _setMode
         *
         * @private
         */
        _onEdit: function () {

            var result = this._super.apply(this, arguments);
            var scrollPosition = this.$(".o_form_sheet_bg").scrollTop();
            console.log("scrollPosition: " + scrollPosition);
            console.log(this.$(".o_form_sheet_bg").scrollTop());

            var self = this;
            this._disableButtons();
            // wait for potential pending changes to be saved (done with widgets
            // allowing to edit in readonly)
            this.mutex.getUnlockedDef()
                .then(this._setMode.bind(this, 'edit'))
                .then(this._enableButtons.bind(this))
                .guardedCatch(this._enableButtons.bind(this));
            setTimeout(function () {
                if (scrollPosition > 0) {
                    console.log("scrollPosition: " + scrollPosition);
                    console.log(self.$(".o_form_sheet_bg").scrollTop());
                    self.$(".o_form_sheet_bg").scrollTop(scrollPosition);
                    console.log("scrollPosition: " + scrollPosition);
                    console.log(self.$(".o_form_sheet_bg").scrollTop());
                }
            }, 500);
            return result;
        },
    });
});