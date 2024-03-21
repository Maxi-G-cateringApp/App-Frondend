import { Component } from '@angular/core';

@Component({
  selector: 'bottom-session',
  templateUrl: './bottom-session.component.html',
  styleUrl: './bottom-session.component.css',
})
export class BottomSessionComponent {
  servicesList: string[] = [
    'Marriage Catering Service',
    'Religious  Events Catering',
    'Birthday Catering',
    'Engagement Catering',
    'House Warming Catering',
    'Corporate  Events Catering',
    'Memmorial  events Catering',
  ];

  paras: string[] = [
    'Event planning and coordination: Let us handle the logistics, so you can relax and enjoy the occasion',
    'Equipment rentals:  We have everything you need, from tables and chairs to linens and tableware.',
    'Décor and floral arrangements:  Enhance the ambiance with stunning visual elements.',
  ];
}
