import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MedicoService } from 'src/app/services/medico.service';
import { Medico } from '../../../models/medicos.models';
import { ModalImageService } from '../../../services/modal-image.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html'
})
export class MedicosComponent implements OnInit {

  public desde = 0;
  public total = 0;
  public Medico: Medico[] = [];
  public MedicoTemp: Medico[] = [];
  public loading = false;
  public ImgSubs!: Subscription;

  constructor(private MedicsService: MedicoService, private ModalSer: ModalImageService,
    // tslint:disable-next-line: align
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.loadsMedics();
    this.ImgSubs = this.ModalSer._NewImage
      .pipe(
        delay(250)
      )
      // Es para hacer la cargar un poco mas lenta,
      // para que el servidor le de tiempo en regresar la data
      .subscribe(img => {
        this.loadsMedics();
      });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.ImgSubs.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  paginacion(valor: number) {
    this.desde += valor;
    console.log(valor);
    if (this.desde < 0) {
      this.desde = 0;


    } else if (this.desde >= this.total) {
      this.desde -= valor;

    }
    this.loadsMedics();
  }

  // tslint:disable-next-line: typedef
  loadsMedics() {
    this.loading = true;
    this.MedicsService.loadMedics(this.desde)
      .subscribe(({ total, medico }) => {
        this.Medico = medico;
        this.MedicoTemp = medico;
        this.total = total;
        console.log(medico);
        this.loading = false;
      });
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.loadsMedics();
    }

    return this.busquedaService.busqueda('medicos', termino)
      .subscribe(resp => {
        this.Medico = resp as Medico[];
      });

  }

  Deletemedic(medico: Medico) {

    Swal.fire({
      title: 'Are you sure?',
      text: `Are you about to delete: ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.MedicsService.DeleteMedic(medico)
          .subscribe(resp => {

            this.loadsMedics();
            if (this.desde === this.total - 1) {
              this.desde -= 5;
            }
            Swal.fire(
              'User deleted',
              `${medico.nombre} has been deleted`,
              'success'
            );
          });
      }
    });

    return;

  }

  showModal(medico: Medico) {
    // tslint:disable-next-line: no-unused-expression
    this.ModalSer.Show('medicos', medico._id, medico.img);
    console.log(medico);
  }

}
