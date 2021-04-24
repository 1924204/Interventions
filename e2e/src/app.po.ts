import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get('/probleme');
  }

  async getTitleText(): Promise<string> {
    return element(by.css('Inter-root .content span')).getText();
  }

  async getParagraphText() : Promise<string> {
    return element(by.css('Inter-root h3')).getText();
  }
  

   // Permet de vider toutes les zones.  A appeller dans chaque test.
   async viderToutesLesZones() : Promise<void> {
    element(by.id('prenomId')).clear();  
    element(by.id('nomId')).clear();     
    // Sélectionner le premier élément dans la zone de liste déroulante (Sélectionner un type de problème (obligatoire))
    element(by.id('noTypeId')).all(by.tagName('option')).get(0).click();      
    // Cliquer sur le bouton radio par défaut (Pas de notification)
    await element.all(by.id('NotificationId')).get(0).click();
    element(by.id('courrielId')).clear();
    element(by.id('courrielConfirmationId')).clear();   
    element(by.id('telephoneId')).clear();       
    element(by.id('noUniteId')).clear();
    element(by.id('descriptionProblemeId')).clear();   
  }

  // Inscrire tous les renseignements obligatoires pour le scénario de base HAPPY PATH (saisie minimum obligatoire pour rendre le formulaire valide)
  async setChampsValidesScenarioNominal() : Promise<void> {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');    
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('noTypeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur le bouton radio voulu
    await element.all(by.id('NotificationId')).get(0).click();  
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }
  
  // Permet d'obtenir toutes les propriétés et leurs valeurs du bouton Sauvegarder
  boutonSubmit() : ElementFinder { 
    return element(by.buttonText('Sauvegarder'));
  }  

  // Permet d'obtenir la classe appliquee actuellement dans la zone Description (entre autres is-valid ou is-invalid)
  obtenirClasseZoneDescriptionProbleme()   { 
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  } 

  async setChampsValidesScenarioAlternatifParMessageTexte() : Promise<void> {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');    
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('noTypeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur le bouton radio voulu
    await element.all(by.id('NotificationId')).get(1).click();  
    element(by.id('telephoneId')).sendKeys('5149381083');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  async setChampsValidesScenarioAlternatifParCourriel() : Promise<void> {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');    
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('noTypeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur le bouton radio voulu
    await element.all(by.id('NotificationId')).get(2).click();  
    element(by.id('courrielId')).sendKeys('aa@bb.cc');
    element(by.id('courrielConfirmationId')).sendKeys('aa@bb.cc');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  async setZoneDescriptionProblemeCaracteresSuffisants() : Promise<void> {
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  async setZoneDescriptionProblemeCaracteresInsuffisants() : Promise<void> {
    element(by.id('descriptionProblemeId')).clear();   
    element(by.id('descriptionProblemeId')).sendKeys('xx');
  }

}
