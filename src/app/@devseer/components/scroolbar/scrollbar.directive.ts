import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
    selector: '[scrollbar]'
})
export class ScrollbarDirective implements OnInit {

    @Input() scrollbar: string
    @Input() allowAllScreens: boolean | string

    hostElement: HTMLElement

    constructor(public elementRef: ElementRef) {
    }

    ngOnInit() {
        this.hostElement = this.elementRef.nativeElement
        if (this.hostElement && this.hostElement.tagName && this.hostElement.tagName == 'ION-CONTENT') {
            let el = document.createElement('style')
            el.innerText = this.scrollbar || this.getCustomStyle()
            this.hostElement.shadowRoot.appendChild(el)
        }
    }

    getCustomStyle() {
        if (this.allowAllScreens === true || this.allowAllScreens === 'true') {
            return `::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: #fff;
        }
        ::-webkit-scrollbar-track:hover {
          background: #f7f7f7;
        }
        ::-webkit-scrollbar-thumb {
          background: #ccc;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #888
        }
        .inner-scroll {
          scrollbar-width: thin
        }`
        } else {
            return `@media(pointer: fine) {
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px var(--ion-background-third);
    border-radius: 6px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--ion-scroll-color);
    border-radius: 6px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(var(--ion-scroll-color-rgb), 0.6);
  }
}`
        }
    }

}
