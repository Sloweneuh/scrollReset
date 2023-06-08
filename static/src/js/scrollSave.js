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
        _onSaveScroll: function (ev) {
            this._super.apply(this, arguments);
            var scrollPosition = this.$(".o_form_sheet_bg").scrollTop();
            console.log("scrollPosition: " + scrollPosition);
            var self = this;
            this._onSave(ev);
            return self.update({}, { reload: false }).then(function () {
                self.$(".o_form_sheet_bg").scrollTop(scrollPosition);
            });
        },

        /**
         * Called when the user wants to edit the current record -> @see _setMode
         *
         * @private
         */
        _onEditScroll: function () {
            this._super.apply(this, arguments);

            var scrollPosition = this.$(".o_form_sheet_bg").scrollTop();
            console.log("scrollPosition: " + scrollPosition);
            var self = this;
            this._onEdit();
            return self.update({}, { reload: false }).then(function () {
                self.$(".o_form_sheet_bg").scrollTop(scrollPosition);
            });
        },

        /**
         * Render buttons for the control panel.  The form view can be rendered in
         * a dialog, and in that case, if we have buttons defined in the footer, we
         * have to use them instead of the standard buttons.
         *
         * @override method from AbstractController
         * @param {jQuery} [$node]
         */
        renderButtons: function ($node) {
            var $footer = this.footerToButtons ? this.renderer.$el && this.renderer.$('footer') : null;
            var mustRenderFooterButtons = $footer && $footer.length;
            if ((this.defaultButtons && !this.$buttons) || mustRenderFooterButtons) {
                this.$buttons = $('<div/>');
                if (mustRenderFooterButtons) {
                    this.$buttons.append($footer);
                } else {
                    this.$buttons.append(qweb.render("FormView.buttons", {widget: this}));
                    this.$buttons.on('click', '.o_form_button_edit', this._onEdit.bind(this));
                    this.$buttons.on('click', '.o_form_button_create', this._onCreate.bind(this));
                    this.$buttons.on('click', '.o_form_button_save', this._onSave.bind(this));
                    this.$buttons.on('click', '.o_form_button_cancel', this._onDiscard.bind(this));
                    this._assignSaveCancelKeyboardBehavior(this.$buttons.find('.o_form_buttons_edit'));
                    this.$buttons.find('.o_form_buttons_edit').tooltip({
                        delay: {show: 200, hide:0},
                        title: function(){
                            return qweb.render('SaveCancelButton.tooltip');
                        },
                        trigger: 'manual',
                    });
                }
            }
            if (this.$buttons && $node) {
                this.$buttons.appendTo($node);
            }
        },
    });
});