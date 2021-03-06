import Intact from 'intact';
import template from './item.vdt';
import DropdownItem from '../dropdown/item';
import Dropdown from '../dropdown/dropdown';
import Menu from './menu';

export default class MenuItem extends DropdownItem {
    @Intact.template()
    static template = template;

    static propTypes = {
        ...DropdownItem.propTypes,
        key: {
            type: String,
            required: true,
        },
        to: String,
    };

    defaults() {
        return {
            ...super.defaults(),
            key: undefined,
            to: undefined,

            _root: undefined,
            _isFirstFloorChildren: false,
            _show: false,
            _parentItem: undefined,
        };
    }

    _init() {
        // if selected hide all dropdown menu
        // the top ancestor dropdown menu can not hide
        // so we override the method here
        this.on('select', () => {
            if (!this.get('_isFirstFloorChildren') && this.get('hideOnSelect')) {
                let ancestor;
                let parent = this.parentVNode;
                while (parent) {
                    const tag = parent.tag;
                    if (tag === Menu && parent.props._isFirstFloorChildren) {
                        ancestor = parent.children;        
                        break;
                    }
                    parent = parent.parentVNode;
                }

                ancestor.hide(true);
            }
        });
        const _root = this.get('_root');
        this._updateStatus(_root, _root.get('selectedKey'));
        _root.on('$change:selectedKey', this._updateStatus);
    }

    _updateStatus(c, v) {
        if (v === this.get('key')) {
            const items = [];
            let parentItem = this.get('_parentItem');
            while (parentItem) {
                items.push(parentItem);
                parentItem = parentItem.get('_parentItem');
            }
            c.set('_highlightedKeys', items.map(item => item.get('key')));
        }
    }

    _onClick(hasSubMenu, e) {
        if (this.get('disabled')) return;

        const root = this.get('_root');
        if (hasSubMenu) {
            root.toggleExpand(this.get('key'));
        } else {
            root.select(this.get('key'));
        }

        this.trigger('click', e);

        if (!hasSubMenu) {
            this.trigger('select', this, e);
            const to = this.get('to');
            if (to) {
                location.href = to;
            }
        }
    }

    focus() {
        if (this._isDropdownItem()) {
            super.focus();
        } else {
            this.set('_isFocus', true);
        }
    }

    _isDropdownItem() {
        const {_root, _isFirstFloorChildren} = this.get();
        return !_isFirstFloorChildren && Menu.showAsDropdown(_root);
    }

    _onDropdownShowChange(c, v) {
        this.set('_show', v);
    }

    _destroy() {
        this.get('_root').off('$change:selectedKey', this._updateStatus);
        super._destroy();
    }
}
