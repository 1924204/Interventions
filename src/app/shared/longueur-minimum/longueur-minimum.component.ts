import { AbstractControl, ValidatorFn } from "@angular/forms";

export class LongueurValidator {
    static longueurMinimum(longueurMinimum: number) : ValidatorFn {
        //Sous ANGULAR dans les validateurs pour indiquer un succes retourne null
        return (valeurControle: AbstractControl): { [key: string]: boolean } | null => { 
            if(valeurControle.value != null) {
                if (valeurControle.value.trim().length >= longueurMinimum) {
                    return null;
                }
            }
            
            return { 'nbreCaracteresInsuffisants': true};
        };
    }
}