import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LongueurValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css'],
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProblemes: ITypeProbleme[];
  errorMessage: String;

  constructor(private fb: FormBuilder, private problemes: TypeproblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
      prenom: ['',[LongueurValidator.longueurMinimum(3), Validators.required]],
      nom: ['',[LongueurValidator.longeurMaximum(50), Validators.required]],
      noType: ['', Validators.required],
      courrielGroup: this.fb.group({
        courriel: [{value:'', disabled: true}],
        courrielConfirmation: [{value:'', disabled: true}],
      }),
      telephone: [{value:'', disabled: true}]
    });

    this.problemes.obtenirTypes()
    .subscribe(type => this.typesProblemes = type,
               error => this.errorMessage = <any>error);  
  }


  appliquerNotifications(typeNotification: string): void {
    const telephoneControl = this.problemeForm.get('telephone');
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const courrielGroupControl = this.problemeForm.get('courrielGroup');      

    // Tous remettre à zéro
    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();  
    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();    
    courrielConfirmationControl.disable();
    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();
    if (typeNotification === 'Courriel') {   
      courrielControl.setValidators([Validators.required]);      
      courrielControl.enable();  
      courrielConfirmationControl.setValidators([Validators.required]);              
      courrielConfirmationControl.enable();  
      }else if (typeNotification === 'Telephone') {
        telephoneControl.setValidators([Validators.required]);
        telephoneControl.enable();
      }  
      telephoneControl.updateValueAndValidity();
      courrielControl.updateValueAndValidity();   
      courrielConfirmationControl.updateValueAndValidity();         
  }
  
  save(): void{
      
  }
}