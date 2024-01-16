import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Hero } from '../hero';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-manage',
  templateUrl: './hero-manage.component.html',
  styleUrls: ['./hero-manage.component.scss'],
})
export class HeroManageComponent {
  hero: Hero;
  confirmText: string;
  formData: FormGroup;
  errors: any;

  constructor(
    private modalCtrl: ModalController,
    private propParams: NavParams
  ) {
    const msg = this.propParams.get('msg');
    const func = this.propParams.get('func');

    this.hero = func();
    this.confirmText = msg;

    // create form
    this.formData = new FormGroup({
      id: new FormControl(
        { value: '', disabled: this.confirmText == 'Entfernen' },
        Validators.required
      ),
      name: new FormControl(
        { value: '', disabled: this.confirmText == 'Entfernen' },
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-Z0-9]+(?:[\s.][a-zA-Z0-9]+)*$/), // letters numbers spaces and points, no spaces at beginning and end
        ]
      ),
      superPower: new FormControl(
        { value: '', disabled: this.confirmText == 'Entfernen' },
        [
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-Z0-9]+(?:[\s.][a-zA-Z0-9]+)*$/), // letters numbers spaces and points, no spaces at beginning and end
        ]
      ),
    });
  }

  ngOnInit() {
    this.errors = {
      id: [{ ErrorType: 'required', ErrorMessage: 'Id ist erforderlich.' }],
      name: [
        { ErrorType: 'required', ErrorMessage: 'Name ist erforderlich.' },
        {
          ErrorType: 'maxlength',
          ErrorMessage: 'Name darf maximal 30 Zeichen haben.',
        },
        {
          ErrorType: 'pattern',
          ErrorMessage:
            'Nur Buchstaben, Zahlen und Punkte erlaubt. Keine Leerzeichen oder Punkte am Anfang oder Ende.',
        },
      ],
      superPower: [
        {
          ErrorType: 'maxlength',
          ErrorMessage: 'Superpower darf maximal 30 Zeichen haben.',
        },
        {
          ErrorType: 'pattern',
          ErrorMessage:
            'Nur Buchstaben, Zahlen und Punkte erlaubt. Keine Leerzeichen oder Punkte am Anfang oder Ende.',
        },
      ],
    };
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.hero.id == 0) return this.modalCtrl.dismiss(this.hero, 'create');
    else if (this.confirmText == 'Aktualisieren')
      return this.modalCtrl.dismiss(this.hero, 'confirm');
    else return this.modalCtrl.dismiss(this.hero, 'delete');
  }
}
