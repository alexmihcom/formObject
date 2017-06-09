(function ($) {

    $.fn.formObject = function () {

        this.get = function () {
            var data = {};
            $(this).find('input, select, textarea').each(function () {
                if ($(this).attr('type') == 'checkbox') {
                    var val;
                    if ($(this).is(':checked')) {
                        if ($(this).val() != '') {
                            val = $(this).val();
                        } else {
                            val = 1;
                        }
                    } else {
                        if ($(this).val() == '') {
                            val = 0;
                        }
                    }

                    if ($(this).attr('name').match(/\[\]$/)) {
                        if (data[$(this).attr('name')] == undefined) {
                            data[$(this).attr('name')] = [];
                        }
                        data[$(this).attr('name')].push(val);
                    } else {
                        data[$(this).attr('name')] = val;
                    }
                } else {
                    data[$(this).attr('name')] = $(this).val();
                }

            });
            return data;
        }

        this.set = function (data, parent) {
            parent = parent || '';
            for (var i in data) {
                if (typeof (data[i]) == 'object') {
                    this.set(data[i], i);
                    continue;
                }
                let name = i;
                if (parent != '') {
                    name = parent + '[' + i + ']';
                }

                $(this).find('[name="' + name + '"], [name="' + name + '[]"]').each(function () {
                    if ($(this).attr('type') == 'checkbox') {
                        if (data[i] == '1') {
                            $(this).prop('checked', true);
                        } else {
                            $(this).prop('checked', false);
                        }
                    } else {
                        $(this).val(data[i]);
                    }
                });
            }
            return this;
        }

        if (typeof this[arguments[0]] == 'function') {
            var args = $.extend([], arguments);
            args.splice(0, 1);
            return this[arguments[0]].apply(this, args);
        }

        return this;
    }

})(jQuery);
