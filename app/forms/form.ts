import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';


export class Carrier {
   constructor(
     public id:number = 1,
     public name:String = 'Test',
     public status:number = 0,
     public description:String = 'long text',
     public created:Date = new Date()
   ){}
}



@Component( {
	selector: 'carrier-form',
	templateUrl: 'app/forms/index.html'
})
export class CarrierFormComponent {
  options = [1,2,3 ];
  carrier:Carrier = new Carrier();

  save() {
    console.log(this.carrier);
  }

  get diagnostic() {
    return JSON.stringify(this.carrier);
  }

  showFormControls(form:NgForm){
    return form.controls['id'] &&
      form.controls['name'].value; // Dr. IQ
  }
}
