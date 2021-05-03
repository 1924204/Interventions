import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { LongueurValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { IProbleme } from './probleme';
import { ProblemeService } from './probleme.service';
import { ITypeProbleme } from './typeprobleme';
import { TypeProblemeService } from './typeprobleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css'],
})
export class ProblemeComponent implements OnInit {
  [x: string]: any;
  problemeForm: FormGroup;
  typesProblemes: ITypeProbleme[];
  errorMessage: String;
  probleme: IProbleme;

  constructor(private fb: FormBuilder, private problemes: TypeProblemeService, private problemeService: ProblemeService, private route : Router) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
      prenom: ['', [LongueurValidator.longueurMinimum(3), Validators.required]],
      nom: ['', [LongueurValidator.longeurMaximum(50), Validators.required]],
      noType: ['', Validators.required],
      notification:['NePasNotifier'],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }],
      }),
      telephone: [{ value: '', disabled: true }],
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: '',
      dateProbleme: {value: Date(), disabled: true}
    });

    this.problemes.obtenirTypes()
      .subscribe(type => this.typesProblemes = type,
        error => this.errorMessage = <any>error);

    this.problemeForm.get('notification').valueChanges.subscribe(value => this.appliquerNotifications(value))
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
      courrielGroupControl.setValidators([emailMatcherValidator.courrielDifferents()])
      courrielControl.setValidators([Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+"), Validators.required])
      courrielControl.enable();
      courrielConfirmationControl.setValidators([Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+"), Validators.required])
      courrielConfirmationControl.enable();
    } else if (typeNotification === 'Telephone' || typeNotification === 'Texte') {
      telephoneControl.setValidators([Validators.required, Validators.pattern("[0-9]+"), Validators.minLength(10), Validators.maxLength(10)]);
      telephoneControl.enable();
    }
    telephoneControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
  }

  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
        // Copy the form values over the problem object values
        this.probleme = this.problemeForm.value;
        this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
        //this.probleme.dateProbleme = new Date();
        this.problemeService.saveProbleme(this.probleme)
            .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                () => this.onSaveComplete(),  // Fonction callback
                (error: any) => this.errorMessage = <any>error
            );
    } else if (!this.problemeForm.dirty) {
        this.onSaveComplete();
    }
  }
  
  onSaveComplete(): void { 
    // Reset the form to clear the flags
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.route.navigate(['/accueil']);
  }

}