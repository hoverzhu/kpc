import Intact from 'intact';
import template from './index.vdt';
import './index.styl';

export default class extends Intact {
    get template() { return template; }

    defaults() {
        return {
            disabled: false,
            value: "",
            max: 9999, // FIXME 默认应该可以无限加减
            min: 0,
            step: 1
        };
    }

    _init() {
        this.set('initValue', this.get('value'));
    }

    _increase(e) {
        let value = this.get('value');
        let step = this.get('step');

        // FIXME 这个判断条件应该前置，这样当条件为真时，可以立即返回，而不用去执行上面的get了
        if (this._disableIncrease()) return;

        value += step;
        this.set('value', value);
        // FIXME 这个changed事件似乎没什么必要，value改变直接有$change:value事件
        // 不要有历史包袱，不用跟kpc早起版本兼容
        this.trigger('changed', value, e);
    }

    _decrease(e) {
        let value = this.get('value');
        let step = this.get('step');

        if (this._disableDecrease()) return;

        value -= step;
        this.set('value', value);
        this.trigger('changed', value, e);
    }


    _disableDecrease() {
        let value = this.get('value');
        let min = this.get('min');
        let step = this.get('step');
        let disabled = this.get('disabled');

        return value <= min || disabled || value - min < step;
    }

    _disableIncrease() {
        let value = this.get('value');
        let max = this.get('max');
        let step = this.get('step');
        let disabled = this.get('disabled');

        return value >= max || disabled || max - value < step;
    }

    _changeValue(e) {
        let val = e.target.value.trim();
        let reg = /^[+-]?\d+$/;
        let disabled = this.get('disabled');
        let max = this.get('max');
        let min = this.get('min');
        let initValue = this.get('initValue');


        if (!reg.test(val) || this.disabled) {
            this.set('value', initValue);
        } else {
            val = parseInt(val);
            if (val >= max) {
                val = max;
            } else if (val < min) {
                val = min;
            } else {
                val = initValue;
            }
            this.set('value', val);
            this.trigger('changed', val, e);
        }
    }

    _destroy() {

    }
}