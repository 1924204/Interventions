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
      noType: ['', Validators.required]
    });

    this.problemes.obtenirTypes()
    .subscribe(type => this.typesProblemes = type,
               error => this.errorMessage = <any>error);  
  }

  save(): void{
      
  }
}