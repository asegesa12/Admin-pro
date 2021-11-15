import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospitals.model';
import { Medico } from 'src/app/models/medicos.models';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public SelectHospital!: Hospital | undefined;
  public medicoSelecionado!: Medico;
  private desde = 0;


  constructor(private fb: FormBuilder, private HospitalesService: HospitalService,
              private medicoServic: MedicoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.LoadMedic(id);
    });



    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });



    this.loadHospital();

    // This instruction is to get all the values from field hospital.

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(HospitalId => {
        this.SelectHospital = this.hospitales.find(h => h._id === HospitalId);
      });

  }

  LoadMedic(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.medicoServic.GetMedicById(id)
    .pipe(
      delay(100)
    )
      .subscribe(medico => {
        const { nombre, hospital: {_id} } = medico;
        console.log(nombre);
        this.medicoSelecionado = medico;
        console.log(medico);
        this.medicoForm.setValue({ nombre, hospital: _id});
      }, error => {
         console.warn(error);
         return this.router.navigateByUrl(`/dashboard/medicos`);
      });
  }

  loadHospital() {
    this.HospitalesService.loadHospital(this.desde)
      .subscribe(({ total, hospital }) => {
        this.hospitales = hospital;
        console.log(hospital);
      });
  }

  saveMedic() {
    console.log(this.medicoSelecionado);
    const { nombre } = this.medicoForm.value;

    if (this.medicoSelecionado) {
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSelecionado._id
      };
      this.medicoServic.Update(data)
        .subscribe(_resp => {
          Swal.fire(
            'Updated',
            `${nombre} updated succesfully`,
            'success'
          );
        });

    } else {


      this.medicoServic.AddMedic(this.medicoForm.value)
        .subscribe((resp: any) => {
  
          Swal.fire(
            'Created',
            `${nombre} created succesfully`,
            'success'
          );
          this.router.navigateByUrl(`/dashboard/medico/${resp.Medico._id}`);

          console.log(resp);
        });
    }
  }
}
