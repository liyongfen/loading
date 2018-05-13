
class Loading{
    constructor(options){
        let defalutOptions = {
            ball:{
                style:{},
             },
            spin:{
                style:{}
            },
            overlay: true
        };
        this._cls = {
            ldsWrap: 'lds-wrap',
            ldsSpin: 'lds-spin',
            ldsDot: 'lds-dot',
            ldsOverlay: 'lds-overlay'
        },
        this.options = this.extend(defalutOptions, options) || {};
        this.options.ball.count = 8;
        
    }
    render($el){
        let $spin, $dot, $dots, $overlay;
        this._$el = $el;
        this._createWrap();
        if(this.options.overlay){//添加蒙层
            $overlay = this._createOverlay();
            this._$wrap.appendChild($overlay);
        }
        $spin = this._createSpin();
        this._createDots($spin);//添加dot
       
        this._$wrap.appendChild($spin);
        this._$el.appendChild(this._$wrap);//添加到页面中
        //临时修复整体居中问题
        $dots = $spin.children;
        var dot_0_style = document.defaultView.getComputedStyle($dots[0], null);
        var dot_2_style =  document.defaultView.getComputedStyle($dots[2],null);

        $spin.style.width = parseFloat(dot_0_style.left) + parseFloat(dot_0_style.width) + 'px';
        $spin.style.height = parseFloat(dot_2_style.top) + parseFloat(dot_2_style.height) + 'px';
    }
    _createOverlay(){
        let $overlay;
        $overlay = document.createElement('div');
        $overlay.className = this._cls.ldsOverlay;
        return $overlay;
    }
    _createWrap(){
        this._$wrap = document.createElement('div');
        this._$wrap.className = this._cls.ldsWrap;
    }
    _createSpin(){
        let $spin;
        $spin = document.createElement('div');
        $spin.className = this._cls.ldsSpin;
        this._addCss(this.options.spin.style, $spin);
        return $spin;
    }
    _createDot(i) {
        let $dot, animationDuration, animationDelay;
        $dot = document.createElement('div');
        $dot.className = this._cls.ldsDot;

        this._addCss(this.options.ball.style, $dot);

        animationDuration = parseFloat(this.options.ball.style.animationDuration);
        animationDelay = animationDuration / this.options.ball.count;
        if (!isNaN(animationDelay)){
            $dot.style.animationDelay = -animationDelay * i + 's';
        }
        return $dot;
    }
    _createDots($spin){
        var count = this.options.ball.count;
        for (let i = count; i > 0; i--) {//添加dot
            $dot = this._createDot(i);
            $spin.appendChild($dot);
        }
        return $spin;
    }    
    remove(){
        if(!this._$wrap || !this._$el){
            return;
        }
        this._$el.removeChild(this._$wrap);
        this._$wrap = null;
    }
    _addCss(cssJson, $element){
        if (!this.isPlainObject(cssJson) || !$element || $element === 0){
            return;
        }
        for (var key in cssJson){
            $element.style[key] = cssJson[key];
        }
    }
    extend(dest, source, isDeep = true) {
        for (var p in source) {
            let src = source[p],
                target = dest[p];
            if (isDeep && (this.isArray(src) || this.isPlainObject(src))) {
                let clone = dest[p] = (target && (this.isArray(target) || this.isPlainObject(target))) ?
                    target : (this.isArray(src) ? [] : {});
                this.extend(clone, src);
            } else {
                if (p == 'prototype') {
                    continue;
                }
                dest[p] = src;
            }
        }
        return dest;
    }
    isPlainObject(v) {
        return v && Object.prototype.toString.call(v) === '[object Object]' && 'isPrototypeOf' in v;
    }
    isArray(v) {
        return v && Object.prototype.toString.call(v) === '[object Array]';
    }
}
