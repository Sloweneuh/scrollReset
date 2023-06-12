odoo.define('scrollReset.saveScroll', function (require) {
    'use strict';

    var FormRenderer = require('web.FormRenderer');
    var FormController = require('web.FormController');

    var core = require('web.core');

    const symbol = Symbol('form');


    FormRenderer.include({
        _renderView: function () {

            var scrollPositionSheet = this.$(".o_form_sheet_bg").scrollTop();
            var scrollPositionContent = this.$(".o_content").scrollTop();
            var self = this;

            console.log(scrollPositionSheet);
            console.log(scrollPositionContent);

            self._super.apply(self, arguments).then(function () {
                if (scrollPositionSheet > 0) {
                    self.$(".o_form_sheet_bg").scrollTop(scrollPositionSheet);
                }
                else if (scrollPositionContent > 0) {
                    self.$(".o_content").scrollTop(scrollPositionContent);
                }
            });

        },

        /**
         
Updates the form's $el with new content.*
@private
@see _renderView
@param {JQuery} $newContent*/

        // _updateView: function ($newContent) {

        //     // var result;
        //     // var scrollPosition = this.$(".o_form_sheet_bg").scrollTop();
        //     // var self = this;
        //     // console.log(self._super);


        //     // console.log(scrollPosition);
        //     // self.$(".o_form_sheet_bg").scrollTop(scrollPosition);


        //     //     if(self._super){
        //     //         result = self._super.apply(self, arguments);

        //     //     };


        //     // // return result;
        //     console.log(this);
        //     this._super.apply(this, arguments);


        // },

    });
});