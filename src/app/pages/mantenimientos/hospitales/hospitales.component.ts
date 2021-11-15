import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospitals.model';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospital: Hospital[] = [];
  public loading = true;
  public desde = 1;
  public total = 0;
  private imgSubs!: Subscription;


  // tslint:disable-next-line: no-shadowed-variable
  constructor(private HospitalService: HospitalService, private busquedaService: BusquedasService,
     private ModalImageService: ModalImageService) { }

  ngOnInit(): void {

    this.loadHospital();

    this.imgSubs = this.ModalImageService._NewImage
      .pipe(
        delay(250)
      )
      // Es para hacer la cargar un poco mas lenta,
      // para que el servidor le de tiempo en regresar la data
      .subscribe(img => {
        this.loadHospital();
      });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.imgSubs.unsubscribe();
  }

  paginacion(valor: number) {
    this.desde += valor;
    console.log(valor);
    if (this.desde < 0) {
      this.desde = 0;


    } else if (this.desde >= this.total) {
      this.desde -= valor;

    }
    this.loadHospital();


  }


  // tslint:disable-next-line: typedef
  loadHospital(){
    this.loading = true;
    this.HospitalService.loadHospital(this.desde)
      .subscribe(({ total, hospital}) => {
        console.log(hospital);
        this.hospital = hospital;
        this.total = total;
        this.loading = false;
      });
  }

  updateHospital(hospital: Hospital){
    this.HospitalService.updateHospital(hospital._id, hospital.nombre)
    .subscribe(resp => {
      Swal.fire(
        'Hospital updated',
        `${hospital.nombre} has been updated`,
        'success'
      );
      console.log(resp);
    });
  }

  DeleteHospital(hospital: Hospital) {

        Swal.fire({
          title: 'Are you sure?',
          text: `Are you about to delete: ${hospital.nombre}`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.HospitalService.DeleteHospital(hospital)
              .subscribe(resp => {

                this.loadHospital();
                if (this.desde === this.total - 1) {
                  this.desde -= 5;
                }
                Swal.fire(
                  'User deleted',
                  `${hospital.nombre} has been deleted`,
                  'success'
                );
              });
          }
        });

        return;

  }

  async CreateHospital(){
    const { value } = await Swal.fire<any>({
      title: 'Create Hospital',
      text: 'Enter name of the hospital',
      input: 'text',
      inputPlaceholder: 'Name',
      showCancelButton: true,
    })

    if(value?.trim().length > 0 ){
        this.HospitalService.createHospital(value)
        .subscribe((resp: any) => {
          console.log(resp);
          this.loadHospital();
        });
    }
  }

  showModal(hospital: Hospital) {
    // tslint:disable-next-line: no-unused-expression
    this.ModalImageService.Show('hospitales', hospital._id, hospital.img);
    console.log(hospital);
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.loadHospital();
    }

    return this.busquedaService.busqueda('hospitales', termino)
      .subscribe(resp => {
        this.hospital = resp as Hospital[];
      });

  }

}
