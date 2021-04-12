import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypeproblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Zone PRÉNOM invalide avec 2 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a'.repeat(2));
    errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisants']).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 3 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a'.repeat(3));
    errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisants']).toBeFalsy();
  });

  it('Zone PRÉNOM valide avec 200 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a'.repeat(200));
    errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisants']).toBeFalsy();
  });

  it('Zone PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 10 espaces', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    zone.setValue('          '.trim());
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a  '.trim());
    errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisants']).toBeTruthy();
  });

  it('Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasNotifier');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  })

  it('Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasNotifier');
    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toEqual(null);
  })

  it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasNotifier');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  })

  it('Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasNotifier');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  })

  it('19 | Zone TELEPHONE est désactivée quand notifer par courriel', () => {
    component.appliquerNotifications('Courriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
})

it('20 | Zone ADRESSE COURRIEL est activée quand notifer par courriel', () => {
  component.appliquerNotifications('Courriel');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  expect(zone.status).not.toEqual('DISABLED');
})

it('21 | Zone CONFIRMER COURRIEL est activée quand notifer par courriel', () => {
  component.appliquerNotifications('Courriel');
  let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
  expect(zone.status).not.toEqual('DISABLED');
})

it('22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifer par courriel', () => {
  let errors = {};
  component.appliquerNotifications('Courriel');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  errors = zone.errors || {};
  expect(errors['required']).toBeTruthy();
})

it('23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifer par courriel', () => {
  let errors = {};
  component.appliquerNotifications('Courriel');
  let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
  errors = zone.errors || {};
  expect(errors['required']).toBeTruthy();
})

it('24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
  let errors = {};
  component.appliquerNotifications('Courriel');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  zone.setValue('a'.repeat(2));
  errors = zone.errors || {};
  expect(errors['pattern']).toBeTruthy();
})

it('25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur retourne null', () => {
  let validator = emailMatcherValidator.courrielDifferents();
  component.appliquerNotifications('Courriel');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');

  zone2.setValue("adresse@courriel.com");

  let group = component.problemeForm.get('courrielGroup');
  let identique = validator(group as AbstractControl);
  expect(identique).toBeNull();
})

it('26 | Zone ADRESSE COURRIEL avec valeur valide et CONFIRMER COURRIEL avec valeur valide retourne null', () => {
  let validator = emailMatcherValidator.courrielDifferents();
  component.appliquerNotifications('Courriel');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');

  zone.setValue("adresse@courriel.com");

  let group = component.problemeForm.get('courrielGroup');
  let identique = validator(group as AbstractControl);
  expect(identique).toBeNull();
})

it('27 | Zone ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
  let validator = emailMatcherValidator.courrielDifferents();
  component.appliquerNotifications('Courriel');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');

  zone.setValue("courriel@adresse.ca");
  zone2.setValue("adresse@courriel.com");

  let group = component.problemeForm.get('courrielGroup');
  let identique = validator(group as AbstractControl);
  expect(group.errors).not.toBeNull();
})


it('28 | Zone ADRESSE COURRIEL et CONFIRMER COURRIEL sont valide si les valeurs sont identiques quand notifier par courriel', () => {
  let validator = emailMatcherValidator.courrielDifferents();
  component.appliquerNotifications('Courriel');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');

  zone.setValue("adresse@courriel.com");
  zone2.setValue("adresse@courriel.com");

  let group = component.problemeForm.get('courrielGroup');
  let identique = validator(group as AbstractControl);
  expect(group.errors).toBeNull();
})

it('29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
  component.appliquerNotifications('Texte');
  let zone = component.problemeForm.get('telephone');
  expect(zone.status).not.toEqual('DISABLED');
})

it('30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
  component.appliquerNotifications('Texte');
  let zone = component.problemeForm.get('courrielGroup.courriel');
  expect(zone.status).toEqual('DISABLED');
})

it('31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
  component.appliquerNotifications('Texte');
  let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
  expect(zone.status).toEqual('DISABLED');
})

it('32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
  let errors = {};
  component.appliquerNotifications('Texte');
  let zone = component.problemeForm.get('telephone');
  errors = zone.errors || {};
  expect(errors['required']).toBeTruthy();
})

it('33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
  let errors = {};
  component.appliquerNotifications('Texte');
  let zone = component.problemeForm.get('telephone');
  zone.setValue('a'.repeat(2));
  errors = zone.errors || {};
  expect(errors['pattern']).toBeTruthy();
})

it('34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier messagerie texte', () => {
  let errors = {};
  component.appliquerNotifications('Texte');
  let zone = component.problemeForm.get('telephone');
  zone.setValue('123456789');
  errors = zone.errors || {};
  expect(errors['minlength']).toBeTruthy();
})

it('35 | Zone TELEPHONE est invalide avec 11 cguffres consécutifs quand notifier par messagerie texte', () => {
  let errors = {};
  component.appliquerNotifications('Texte');
  let zone = component.problemeForm.get('telephone');
  zone.setValue('01234567891');
  errors = zone.errors || {};
  expect(errors['maxlength']).toBeTruthy();
})

it('36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
  let errors = {};
  component.appliquerNotifications('Texte');
  let zone = component.problemeForm.get('telephone');
  zone.setValue('0123456789');
  expect(zone.errors).toBeNull();
})
});
