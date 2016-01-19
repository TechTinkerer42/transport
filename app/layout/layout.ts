import {Directive, Component, View, ElementRef, Renderer, Input} from 'angular2/core';
import {window} from 'angular2/src/facade/browser';

export enum LayoutSchema {
    AutoHide,
    AlwaysOpen,
    OffCanvas,
    Bar
};


interface LayoutListener {
    changeLayout(layoutName: LayoutSchema): void;
    _type:String[];
}


interface LayoutMouseListener extends LayoutListener {
    notifyMouse(isMouseEnter: boolean): void;
}


interface LayoutWindowListener  extends LayoutListener {
    notifyResize(size: number): void;
}


function _window(): any {
  return window
}



const OPEN_BAR_CLASS = 'is-open-bar';
const THIN_BAR_CLASS = 'is-thin-bar';
const OFF_CANVAS_CLASS = 'is-off-canvas';
const MIN_WIDTH = 768;
const SIDEBAR_OPEN = 220;
const SIDEBAR_BAR = 35;



export class LayoutManager {
    private listeners: LayoutListener[] = [];
    private profileSchema: LayoutSchema;
    private windowWidth:number;

    activeSchema: LayoutSchema;

    constructor() {
        this.windowWidth = _window().innerWidth;
        this.activeSchema = LayoutSchema.AlwaysOpen;
        this.profileSchema = this.activeSchema;
        // todo get storage and pull/save prefered layout
    }

    setLayout(schema: LayoutSchema) {
        console.log(`layout:${schema}`);
        this.activeSchema = schema;
        this.listeners.forEach((listener: LayoutListener) => {
            this.updateListener(listener);
        })
    }

    updateListener(listener: LayoutListener) {
        listener.changeLayout(this.activeSchema);
    }

    register(listener: LayoutListener) {
        this.listeners.push(listener);
        this.updateListener(listener);
    }

    notifyAllMouse(isMouseEnter: boolean) {
        console.log(`mouse:${isMouseEnter}`);

        this.listeners.forEach((listener) => {
            if (listener._type.indexOf('mouse') >= 0) {
                if (this.activeSchema == LayoutSchema.AutoHide ||
                        this.activeSchema == LayoutSchema.OffCanvas) {
                    (<LayoutMouseListener>listener).notifyMouse(isMouseEnter);
                }
            }
        });
    }

    notifyWindowResize(size:number) {
        console.log(`resize:${size}`);

        if (size < MIN_WIDTH && this.activeSchema != LayoutSchema.OffCanvas) {
            this.activeSchema = LayoutSchema.OffCanvas;
            this.setLayout(this.activeSchema);
        }
        else if (size >= MIN_WIDTH && this.activeSchema != this.profileSchema) {
            this.activeSchema = this.profileSchema;
            this.setLayout(this.activeSchema);
        }

        this.listeners.forEach((listener) => {
            if (listener._type.indexOf('window') >= 0) {
                (<LayoutWindowListener>listener).notifyResize(size);
            }
        });
    }
}



@Component({
    selector: 'layout-preference',
    templateUrl: 'app/layout/index.html'
})
export class LayoutPreference {
    layoutSchema: LayoutSchema;

    constructor(private layoutManager: LayoutManager) {
        this.layoutSchema = layoutManager.activeSchema;
    }

    changeLayout(schema: number) {
        this.layoutSchema = schema;
        this.layoutManager.setLayout(this.layoutSchema);
    }

    windowResize(event:any) {
        this.layoutManager.notifyWindowResize(event.target.innerWidth);
    }
}


@Component({
    selector: 'layout-offcanvas-button',
    template: `
        <a *ngIf="visible" (click)="toggleSidebar()"><i class="fa fa-bars"></i></a>
    `
})
export class OffCanvasButton implements LayoutListener {
    _type = ['layout'];
    visible = false;
    private layoutSchema:LayoutSchema
    private toggleState = true;

    constructor(private layoutManager: LayoutManager) {
        layoutManager.register(this);
    }

    changeLayout(layoutName: LayoutSchema) {
        this.layoutSchema = layoutName;
        this.visible = this.layoutSchema == LayoutSchema.OffCanvas;
    }

    toggleSidebar() {
        if (this.toggleState) {
            this.layoutManager.notifyAllMouse(false);
            this.toggleState = false;
        }
        else {
            this.layoutManager.notifyAllMouse(true);
            this.toggleState = true;
        }
    }
}


@Directive({
    selector: '[layoutMaster]',
    host: {
        '[style.top]':'layoutTop',
        '[style.left]':'layoutLeft',
        '[style.width]':'layoutWidth'
    }
})
export class LayoutMasterDirective implements LayoutWindowListener, LayoutMouseListener {
    _type = ['layout','window','mouse'];
    layoutTop:String;
    layoutWidth:String;
    layoutLeft:String;
    private layoutSchema:LayoutSchema;

    constructor(private el: ElementRef, private renderer: Renderer, layoutManager: LayoutManager) {
        layoutManager.register(this);
    }

    changeLayout(name: LayoutSchema) {
        this.layoutSchema = name;

        switch (this.layoutSchema) {
            case LayoutSchema.AutoHide:
                this.renderer.setElementClass(this.el, THIN_BAR_CLASS, true);
                this.renderer.setElementClass(this.el, OPEN_BAR_CLASS, false);
                this.renderer.setElementClass(this.el, OFF_CANVAS_CLASS, false);
                this.layoutWidth = '100%';
                break;

            case LayoutSchema.AlwaysOpen:
                this.renderer.setElementClass(this.el, OPEN_BAR_CLASS, true);
                this.renderer.setElementClass(this.el, THIN_BAR_CLASS, false);
                this.renderer.setElementClass(this.el, OFF_CANVAS_CLASS, false);
                this.layoutWidth = '100%';
                break;

            case LayoutSchema.OffCanvas:
                this.renderer.setElementClass(this.el, OFF_CANVAS_CLASS, true);
                this.renderer.setElementClass(this.el, OPEN_BAR_CLASS, false);
                this.renderer.setElementClass(this.el, THIN_BAR_CLASS, false);
                this.notifyResize(_window().innerWidth);
                break;

                case LayoutSchema.Bar:
                    this.renderer.setElementClass(this.el, THIN_BAR_CLASS, true);
                    this.renderer.setElementClass(this.el, OPEN_BAR_CLASS, false);
                    this.renderer.setElementClass(this.el, OFF_CANVAS_CLASS, false);
                    this.layoutWidth = '100%';
                    break;
        }
    }

    notifyResize(size:number) {
        if (this.layoutSchema == LayoutSchema.OffCanvas){
            this.layoutWidth = (size + SIDEBAR_OPEN) + 'px';
        }
        else {
            this.layoutWidth = '100%';
        }
    }

    notifyMouse(sidebarOpen: boolean) {
        if (this.layoutSchema == LayoutSchema.OffCanvas) {
            if (sidebarOpen) {
                this.renderer.setElementClass(this.el, OPEN_BAR_CLASS, false);
                this.renderer.setElementClass(this.el, OFF_CANVAS_CLASS, true);
            }
            else {
                this.renderer.setElementClass(this.el, OPEN_BAR_CLASS, true);
                this.renderer.setElementClass(this.el, OFF_CANVAS_CLASS, false);
            }
        }
        else if (this.layoutSchema == LayoutSchema.AutoHide) {
            if (sidebarOpen) {
                this.renderer.setElementClass(this.el, THIN_BAR_CLASS, false);
            }
            else {
                this.renderer.setElementClass(this.el, THIN_BAR_CLASS, true);
            }
        }
    }
}



@Directive({
    selector: '[layoutContent]',
    host: {
        '[style.width]':'contentWidth'
    }
})
export class LayoutContentDirective implements LayoutMouseListener {
    _type = ['layout','mouse'];
    contentWidth:number;

    constructor(private el: ElementRef, private renderer: Renderer, layoutManager: LayoutManager) {
        layoutManager.register(this);
    }

    changeLayout(name: LayoutSchema) {
    }

    notifyMouse(isMouseEnter: boolean) {
    }
}



@Directive({
    selector: '[layoutSidebar]',
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
})
export class LayoutSidebarDirective implements LayoutMouseListener {
    _type = ['layout','mouse'];
    private currentSchema: LayoutSchema;

    constructor(private el: ElementRef, private renderer: Renderer, private layoutManager: LayoutManager) {
        layoutManager.register(this);
    }

    changeLayout(name: LayoutSchema) {
        this.currentSchema = name;
    }

    onMouseEnter() {
        if(this.layoutManager.activeSchema == LayoutSchema.AutoHide) {
            this.layoutManager.notifyAllMouse(true);
        }
    }

    onMouseLeave() {
        if(this.layoutManager.activeSchema == LayoutSchema.AutoHide) {
            this.layoutManager.notifyAllMouse(false);
        }
    }

    notifyMouse(isMouseEnter: boolean) {
    }
}
