odoo.define('scrollReset.saveScroll', function (require) {
    'use strict';

    var FormRenderer = require('web.FormRenderer');
    
    FormRenderer.include({
        _renderView: function () {
            var scrollPositionSheet = this.$(".o_form_sheet_bg").scrollTop();
            var scrollPositionContent = $(".o_content").scrollTop();
            var self = this;    
    
            self._super.apply(self, arguments).then(function () {
                if (scrollPositionSheet > 0) {

                    self.$(".o_form_sheet_bg").scrollTop(scrollPositionSheet);
                } else if (scrollPositionContent > 0){
                    
                    $(".o_content").scrollTop(scrollPositionContent);
                } 
            });
        },
    });
});