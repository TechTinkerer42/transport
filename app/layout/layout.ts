import {Directive, ElementRef, Renderer, Input, OnInit} from 'angular2/core';
import 'jquery';
import 'foundation-sites/dist/foundation';

declare var jQuery:any;

enum LayoutSchema { AutoHide, AlwaysOpen, OffCanvas };

interface LayoutListener {
  _type:String;
  setLayout(layoutName: LayoutSchema, useMouseLeave: boolean): void;
}

interface LayoutMouseListener extends LayoutListener{
  notifyMouse(inOrOut: boolean):void;
}

export class LayoutManager implements OnInit {
  useMouseLeave: boolean = false;
  private listeners: LayoutListener[] = [];
  private profileSchema: LayoutSchema = LayoutSchema.AutoHide;
  private activeSchema: LayoutSchema = LayoutSchema.AutoHide;

  ngOnInit(){
    console.log('init LayoutManager');
    const $ = jQuery(window);
    $(document).foundation();

    $(window).on('changed.zf.mediaquery', (event:any, name:any) => {
      console.log(`name=${name}`)

      if (name === 'small' || name === 'medium') {
        this.activeSchema = LayoutSchema.OffCanvas
      }
      else {
        this.activeSchema = this.profileSchema;
      }

      this.listeners.forEach((listener)=>{
        this.setLayout(listener);
      })
    });
  }

  setLayout(listener: LayoutListener) {
    listener.setLayout(this.activeSchema, this.useMouseLeave);
  }

  register(listener: LayoutListener) {
    this.listeners.push(listener);
  }

  notifyAllMouse(inOrOut: boolean) {
    this.listeners.forEach((listener)=>{
      if (listener._type == 'mouse') {
        (<LayoutMouseListener>listener).notifyMouse(inOrOut);
      }
    });
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
    layoutManager.setLayout(this);
  }

  setLayout(name: LayoutSchema, useMouseLeave: boolean) {
    this.currentSchema = name;

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
      this.renderer.setElementClass(this.el, 'is-fat', true);
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
    layoutManager.setLayout(this);
  }

  setLayout(name: LayoutSchema, useMouseLeave: boolean) {
    switch (name) {
      case LayoutSchema.AutoHide:
        this.renderer.setElementClass(this.el, 'sidebar-content', false);
        break;

      case LayoutSchema.AlwaysOpen:
        this.renderer.setElementClass(this.el, 'sidebar-content', true);
        this.renderer.setElementClass(this.el, 'is-fat', true);
        break;

      case LayoutSchema.OffCanvas:
        this.renderer.setElementClass(this.el, 'off-canvas-content', false);
        break;
    }
  }

  notifyMouse(inOrOut: boolean) {
    if(inOrOut) {
      this.renderer.setElementClass(this.el, 'is-fat', true);
    }
    else {
      this.renderer.setElementClass(this.el, 'is-fat', true);
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
    layoutManager.setLayout(this);
  }

  setLayout(name: LayoutSchema, useMouseLeave: boolean) {
    switch (name) {
      case LayoutSchema.AutoHide:
        break;

      case LayoutSchema.AlwaysOpen:
        break;

      case LayoutSchema.OffCanvas:
        this.renderer.setElementClass(this.el, 'off-canvas-wrapper-inner', false);
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
    layoutManager.setLayout(this);
  }

  setLayout(name: LayoutSchema, useMouseLeave: boolean) {
    switch (name) {
      case LayoutSchema.AutoHide:
        this.renderer.setElementClass(this.el, 'sidebar-wrapper', false);
        break;

      case LayoutSchema.AlwaysOpen:
        this.renderer.setElementClass(this.el, 'sidebar-wrapper', true);
        break;

      case LayoutSchema.OffCanvas:
        this.renderer.setElementClass(this.el, 'off-canvas-wrapper', false);
        break;
    }
  }
}
