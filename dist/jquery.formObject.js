(function ($) {

    $.fn.formObject = function () {

        this.get = function () {
            var data = {};
            $(this).find('input, select, textarea').each(function () {
                var val;
                
                if ($(this).attr('type') == 'checkbox') {
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
                } else {
                    val = $(this).val();
                }
        
                var keys = [];
                if($(this).attr('name') != undefined) {
                    $(this).attr('name').replace(/^([^\[\]]+)/, function(match, p1) {
                        keys.push(p1)
                    });
                    $(this).attr('name').replace(/\[([^\[\]]*)\]/g, function(match, p1) {
                        keys.push(p1)
                    });
                }
                
                if(keys.length > 0) {
                    var current = data
                    for(var i in keys) {
                        if(i >= (keys.length - 1)) {
                            current[keys[i]] = val
                        } else if(typeof current[keys[i]] == 'undefined') {
                            current[keys[i]] = {}
                        }
                        current = current[keys[i]]
                    }
                } else {
                    data[$(this).attr('name')] = val;
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
                var name = i;
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
