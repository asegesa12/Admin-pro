import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, delay, map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuarios.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {


  public total = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde = 0;
  public loading!: boolean;
  public ImgSubs! : Subscription;
 



  constructor(private usuariosService: UsuarioService, private busquedaService: BusquedasService,
              private ModalImageService: ModalImageService
    
    ) { }

// #txtBuscar (keyup)="buscar(txtBuscar.value)"

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.ImgSubs.unsubscribe();
  }

  ngOnInit(): void {
      this.loadUsers();
      this.ImgSubs = this.ModalImageService._NewImage
      .pipe(
        delay(250)
      )
      // Es para hacer la cargar un poco mas lenta, 
      // para que el servidor le de tiempo en regresar la data
      .subscribe( img => {
        this.loadUsers();
      });


      // tslint:disable-next-line: no-non-null-assertion
      /*const input = document.getElementById('buscaUsuario')!;

      fromEvent(input, 'input')
      .pipe(
        // Tomamos las letras ingresadas en el input
        map((k: any) => {

          this.loading = true;
          return k.target.value;

        }),
        // tslint:disable-next-line: max-line-length
        // Seleccionamos un tiempo en milisegundos antes de continuar la ejecución luego de que se presionó la última letra, si hay cambios en el input vuelve a empezar a contar
        debounceTime(1500),
        // Ahora si ejecutamos la busqueda del usuario con el total de letras en el input
        // luego de que se dejara de escribir por 1,5 segundos
      ).subscribe(val => {
        if (val !== '') {
          this.busquedaService.busqueda('usuarios', val)
            .subscribe((usuarios: Usuario[]) => {
              this.usuarios = usuarios;
              this.loading = false;
            });
        } else {
          this.loadUsers();
          return;
        }
      });*/

  }



  loadUsers(){
    this.loading = true;
    this.usuariosService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {



        this.total = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.loading = false;


      });
  }

  paginacion(valor: number){
    this.desde += valor;
    console.log(valor);
    if ( this.desde < 0){
      this.desde = 0;


    } else if ( this.desde >= this.total){
      this.desde -= valor;

    }
    this.loadUsers();


  }

  buscar(termino: string ){

    if (termino.length === 0){
      return this.usuarios = this.usuariosTemp;
    }

    return this.busquedaService.busqueda('usuarios', termino)
      .subscribe(resp => {
          this.usuarios = resp as Usuario[];
      });

  }

  // tslint:disable-next-line: typedef
  RemoveUser(usuario: Usuario){

    if ( usuario.uid === this.usuariosService.uid){
      return Swal.fire('Error', 'You cannot delete it yourself', 'error');
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `Are you about to delete: ${ usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.RemoveUserService(usuario)
          .subscribe( resp => {

            this.loadUsers();
            if (this.desde === this.total - 1){
                this.desde -= 5;
            }
            Swal.fire(
              'User deleted',
              `${usuario.nombre} has been deleted`,
              'success'
            );
          });
      }
    });

    return;
  }

  ChangeUser(usuario: Usuario){
    this.usuariosService.changeUser(usuario)
        .subscribe(resp => {
          console.log(resp);
        });
    // console.log(usuario);
  }

  showModal( usuario: Usuario){
    // tslint:disable-next-line: no-unused-expression
    this.ModalImageService.Show('usuarios', usuario.uid , usuario.img);
    console.log(usuario);
  }

}
