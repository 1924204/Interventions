import { AbstractControl } from "@angular/forms";
import { LongueurValidator } from "./longueur-minimum.component";

describe('Longueur zone Validator', () => {
    it('une chaîne avec 10 espaces est invalide', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = LongueurValidator.longueurMinimum(3);
        let valeurControle = {value: "          "};
        //Faire l'appel du validateur
        let longueur = validator(valeurControle as AbstractControl);

        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(longueur['nbreCaracteresInsuffisants']).toBe(true);
    })

    it('une phrase avec des mots est valide', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = LongueurValidator.longueurMinimum(3);
        let valeurControle = {value: "Vive angular"};
        //Faire l'appel du validateur
        let longueur = validator(valeurControle as AbstractControl);

        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(longueur).toBeNull();
    })

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = LongueurValidator.longueurMinimum(3);
        let valeurControle = {value: "   je le veux   "};
        //Faire l'appel du validateur
        let longueur = validator(valeurControle as AbstractControl);

        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(longueur).toBeNull();
    })

    it('une phrase avec 1 espace et 2 caractères est invalide', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = LongueurValidator.longueurMinimum(3);
        let valeurControle = {value: " xx"};
        //Faire l'appel du validateur
        let longueur = validator(valeurControle as AbstractControl);

        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(longueur['nbreCaracteresInsuffisants']).toBe(true);
    })

    it('une phrase avec 2 espaces et 1 caractère est invalide', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = LongueurValidator.longueurMinimum(3);
        let valeurControle = {value: "  x"};
        //Faire l'appel du validateur
        let longueur = validator(valeurControle as AbstractControl);

        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(longueur['nbreCaracteresInsuffisants']).toBe(true);
    })

    it('une phrase avec 3 espaces et 3 caractères est valide', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = LongueurValidator.longueurMinimum(3);
        let valeurControle = {value: "   xxx"};
        //Faire l'appel du validateur
        let longueur = validator(valeurControle as AbstractControl);

        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(longueur).toBeNull();
    })

    it('une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = LongueurValidator.longueurMinimum(3);
        let valeurControle = {value: "     xxxxx     "};
        //Faire l'appel du validateur
        let longueur = validator(valeurControle as AbstractControl);

        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(longueur).toBeNull();
    })

    it('une chaîne nulle est invalide', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = LongueurValidator.longueurMinimum(3);
        let valeurControle = {value: null};
        //Faire l'appel du validateur
        let longueur = validator(valeurControle as AbstractControl);

        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(longueur['nbreCaracteresInsuffisants']).toBe(true);
    })
});

