import {Directive, ElementRef, Renderer, Input} from 'angular2/core';
import 'jquery';
import 'foundation-sites/dist/foundation';

$(document).foundation();

interface LayoutListener {
  setLayout(s: string): void;
}

export class LayoutManager {
  useMouseLeave: boolean = false;
  forceOffCanvas: boolean = false;
  private listeners: LayoutListener[] = [];

  constructor() {

    $(window).on('changed.zf.mediaquery', (event, name) => {
      console.log(`change to: ${name}`)

      for (var listener in this.listeners) {
        listener.setLayout(name);
      }
    });
  }

  register(listener: LayoutListener) {
    this.listeners.push(listener);
  }
}

@Directive({
  selector: '[layoutSidebar]'
})
export class LayoutSidebarDirective implements LayoutListener {
  
  constructor(private el: ElementRef, private renderer: Renderer, layoutManager: LayoutManager) {
    layoutManager.register(this);
  }

  setLayout(name: string) {
    console.log(`set layout: ${name}`);
    this.renderer.setElementClass(el, 'sidebar', true);
    this.renderer.setElementClass(el, 'show-for-medium', true);
    this.renderer.setElementClass(el, 'is-fat', true);
  }

}

@Directive({
  selector: '[layoutContent]'
})
export class LayoutContentDirective implements LayoutListener {

  constructor(private el: ElementRef, private renderer: Renderer, layoutManager: LayoutManager) {
    layoutManager.register(this);
  }

  setLayout(name: string) {
    console.log(`set layout: ${name}`);
    this.renderer.setElementClass(el, 'sidebar-content', true);
    this.renderer.setElementClass(el, 'is-fat', true);
  }
}


@Directive({
  selector: '[layoutInner]'
})
export class LayoutInnerDirective implements LayoutListener {

  constructor(private el: ElementRef, private renderer: Renderer, layoutManager: LayoutManager) {
    layoutManager.register(this);
    // renderer.setElementStyle(el, 'background', 'blue');
  }
  setLayout(name: string) {
    console.log(`set layout: ${name}`);
  }
}

@Directive({
  selector: '[layoutMaster]'
})
export class LayoutMasterDirective implements LayoutListener {

  constructor(private el: ElementRef, private renderer: Renderer, layoutManager: LayoutManager) {
    layoutManager.register(this);

  }
  setLayout(name: string) {
    console.log(`set layout: ${name}`);
    this.renderer.setElementClass(el, 'sidebar-wrapper', true);
  }
}
