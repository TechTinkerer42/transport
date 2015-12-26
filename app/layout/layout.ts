import {Directive, Component, View, ElementRef, Renderer, Input} from 'angular2/core';
import 'jquery';
import 'foundation-sites/dist/foundation';

declare var jQuery:any;

export enum LayoutSchema { AutoHide, AlwaysOpen, OffCanvas };



interface LayoutListener {
  _type:String;
  changeLayout(layoutName: LayoutSchema): void;
}

interface LayoutMouseListener extends LayoutListener{
  notifyMouse(inOrOut: boolean):void;
}



export class LayoutManager  {
  private listeners: LayoutListener[] = [];
  private profileSchema: LayoutSchema = LayoutSchema.AlwaysOpen;
  private activeSchema: LayoutSchema = LayoutSchema.AlwaysOpen;

  constructor(){

    setTimeout(() => {
      jQuery(document).foundation();
      jQuery(window).on('changed.zf.mediaquery', (event:any, name:any) => {

        if (name === 'small' || name === 'medium') {
          this.activeSchema = LayoutSchema.OffCanvas
        }
        else {
          this.activeSchema = this.profileSchema;
        }

        this.listeners.forEach((listener:LayoutListener)=>{
          this.updateListener(listener);
        })
      });
    },0);

  }

  setLayout(schema:LayoutSchema) {
      this.profileSchema = schema;
      this.activeSchema = schema;
      this.listeners.forEach((listener:LayoutListener)=>{
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

  notifyAllMouse(inOrOut: boolean) {
    this.listeners.forEach((listener)=>{
      if (listener._type == 'mouse') {
        (<LayoutMouseListener>listener).notifyMouse(inOrOut);
      }
    });
  }
}



@Component({
  selector: 'layout-preference'
})
@View({
	templateUrl: 'app/layout/index.html'
})
export class LayoutPreference {
  layoutSchema:number;

  constructor(private layoutManager:LayoutManager) {
    this.layoutSchema = 1;
  }

  changeLayout() {
    console.log(`changeLayout:${this.layoutSchema}`)
    this.layoutManager.setLayout(LayoutSchema[LayoutSchema[this.layoutSchema]]);
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
  _type:String = 'mouse';
  private currentSchema: LayoutSchema;

  constructor(private el: ElementRef, private renderer: Renderer, private layoutManager: LayoutManager) {
    layoutManager.register(this);
  }

  changeLayout(name: LayoutSchema) {
    this.currentSchema = name;
    this.renderer.setElementClass(this.el, 'sidebar', false);
    this.renderer.setElementClass(this.el, 'show-for-medium', false);
    this.renderer.setElementClass(this.el, 'is-fat', true);
    this.renderer.setElementClass(this.el, 'position-left', false);
    this.renderer.setElementClass(this.el, 'off-canvas', false);

    switch (name) {
      case LayoutSchema.AutoHide:
        console.log('set layout autohide');
        this.renderer.setElementClass(this.el, 'show-for-medium', true);
        this.renderer.setElementClass(this.el, 'sidebar', true);
        break;

      case LayoutSchema.AlwaysOpen:
        console.log('set layout alwaysOpen');
        this.renderer.setElementClass(this.el, 'sidebar', true);
        this.renderer.setElementClass(this.el, 'show-for-medium', true);
        this.renderer.setElementClass(this.el, 'is-fat', true);
        break;

      case LayoutSchema.OffCanvas:
        console.log('set layout offCanvas');
        this.renderer.setElementClass(this.el, 'position-left', true);
        this.renderer.setElementClass(this.el, 'off-canvas', true);
        break;
    }
  }

  onMouseEnter() {
    if (this.currentSchema == LayoutSchema.AutoHide) {
      this.layoutManager.notifyAllMouse(true);
    }
  }

  onMouseLeave() {
    if (this.currentSchema == LayoutSchema.AutoHide) {
      this.layoutManager.notifyAllMouse(false);
    }
  }

  notifyMouse(inOrOut: boolean) {
    if(inOrOut) {
      this.renderer.setElementClass(this.el, 'is-fat', true);
    }
    else {
      this.renderer.setElementClass(this.el, 'is-fat', false);
    }
  }
}



@Directive({
  selector: '[layoutContent]'
})
export class LayoutContentDirective implements LayoutMouseListener {
  _type:String = 'mouse';

  constructor(private el: ElementRef, private renderer: Renderer, layoutManager: LayoutManager) {
    layoutManager.register(this);
  }

  changeLayout(name: LayoutSchema) {
    this.renderer.setElementClass(this.el, 'sidebar-content', false);
    this.renderer.setElementClass(this.el, 'is-fat', false);
    this.renderer.setElementClass(this.el, 'off-canvas-content', false);

    switch (name) {
      case LayoutSchema.AutoHide:
        this.renderer.setElementClass(this.el, 'sidebar-content', true);
        break;

      case LayoutSchema.AlwaysOpen:
        this.renderer.setElementClass(this.el, 'sidebar-content', true);
        this.renderer.setElementClass(this.el, 'is-fat', true);
        break;

      case LayoutSchema.OffCanvas:
        this.renderer.setElementClass(this.el, 'off-canvas-content', true);
        break;
    }
  }

  notifyMouse(inOrOut: boolean) {
    if(inOrOut) {
      this.renderer.setElementClass(this.el, 'is-fat', true);
    }
    else {
      this.renderer.setElementClass(this.el, 'is-fat', false);
    }
  }
}



@Directive({
  selector: '[layoutInner]'
})
export class LayoutInnerDirective implements LayoutListener {
  _type:String = 'layout';

  constructor(private el: ElementRef, private renderer: Renderer, layoutManager: LayoutManager) {
    layoutManager.register(this);
  }

  changeLayout(name: LayoutSchema) {
    this.renderer.setElementClass(this.el, 'off-canvas-wrapper-inner', false);

    switch (name) {
      case LayoutSchema.AutoHide:
        break;

      case LayoutSchema.AlwaysOpen:
        break;

      case LayoutSchema.OffCanvas:
        this.renderer.setElementClass(this.el, 'off-canvas-wrapper-inner', true);
        break;
    }
  }
}



@Directive({
  selector: '[layoutMaster]'
})
export class LayoutMasterDirective implements LayoutListener {
  _type:String = 'layout';

  constructor(private el: ElementRef, private renderer: Renderer, layoutManager: LayoutManager) {
    layoutManager.register(this);
  }

  changeLayout(name: LayoutSchema) {
    this.renderer.setElementClass(this.el, 'sidebar-wrapper', false);
    this.renderer.setElementClass(this.el, 'off-canvas-wrapper', false);

    switch (name) {
      case LayoutSchema.AutoHide:
        this.renderer.setElementClass(this.el, 'sidebar-wrapper', true);
        break;

      case LayoutSchema.AlwaysOpen:
        this.renderer.setElementClass(this.el, 'sidebar-wrapper', true);
        break;

      case LayoutSchema.OffCanvas:
        this.renderer.setElementClass(this.el, 'off-canvas-wrapper', true);
        break;
    }
  }
}
