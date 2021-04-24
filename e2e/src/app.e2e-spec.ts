import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();
    expect(await page.getParagraphText()).toEqual('Déclarer un problème');
  });

  it('#38 | doit activer le bouton Sauvegarder avec champs valides scénario nominal', async () => {
    await page.viderToutesLesZones();
    await page.setChampsValidesScenarioNominal();                              
    expect(await page.boutonSubmit().isEnabled()).toBeTruthy();
  });

  it('#39 | doit active le bouton Sauvegarder avec champs valides scénario alternatif Par message TEXTE', async () => {
    await page.viderToutesLesZones();
    await page.setChampsValidesScenarioAlternatifParMessageTexte();                              
    expect(await page.boutonSubmit().isEnabled()).toBeTruthy();
  }); 
  
  it('#40 | doit active le bouton Sauvegarder avec champs valides scénario alternatif Par courriel', async () => {
    await page.viderToutesLesZones();
    await page.setChampsValidesScenarioAlternatifParCourriel();                              
    expect(await page.boutonSubmit().isEnabled()).toBeTruthy();
  });   

  it('#41 | Zone DESCRIPTION DU PROBLEME a une bordure VERTE si nombre de caractères suffisant', async () => {
    await page.viderToutesLesZones();
    await page.setZoneDescriptionProblemeCaracteresSuffisants();                              
    expect(await page.obtenirClasseZoneDescriptionProbleme()).toContain('is-valid');
  });  

  it('#42 | Zone DESCRIPTION DU PROBLEME a une bordure ROUGE si nombre de caractères insuffisant', async () => {
    await page.setZoneDescriptionProblemeCaracteresInsuffisants();                      
    expect(await page.obtenirClasseZoneDescriptionProbleme()).toContain('is-invalid');
  });  
});


