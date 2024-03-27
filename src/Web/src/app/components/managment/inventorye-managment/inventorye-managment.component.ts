import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../../models/modelsProducts/inventory';
import { InventoryService } from '../../../services/servicesProducts/inventory.service';
import { ProductCategoryService } from '../../../services/servicesProducts/productcategory.service';
import { ProductCategory } from '../../../models/modelsProducts/productcategory';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inventorye-managment',
  templateUrl: './inventorye-managment.component.html',
  styleUrls: ['./inventorye-managment.component.css'],
  providers: [ProductCategoryService, InventoryService],
})
export class InventoryeManagmentComponent implements OnInit {
  constructor(
    private productCategoryService: ProductCategoryService,
    private inventoryService: InventoryService
  ) {}

  category: Array<{
    id: string;
    name: string;
    image: string;
  }> = [];

  products: Array<{
    id: string;
    name: string;
    code: string;
    price: Number;
    points: Number;
    count: Number;
    category: string;
    idcategory: string;
    i: number;
    image: string;
  }> = [];

  categorydata: boolean = true;
  categoryselect: boolean = false;
  edit: boolean = false;
  update: boolean = false;

  // * Variable's preview photo
  file: File[] = [];
  imageDefatult: string = environment.backend + '/public/images/basic.png';
  photoSelected: Array<string> | ArrayBuffer | any = [
    this.imageDefatult,
    this.imageDefatult,
  ];

  ngOnInit(): void {
    this.actualizar();
  }

  editar() {
    this.edit = this.edit == true ? false : true;
  }

  onPhotoSelected(event: any, id: number): void {
    if (event.target.files && event.target.files[0]) {
      this.file[id] = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected[id] = reader.result);
      reader.readAsDataURL(this.file[id]);
    }
  }

  getProducts() {
    this.products = [];
    this.inventoryService.getInventorys().subscribe((res) => {
      let data = res as Inventory[];
      this.products = [];
      for (let i = 0; i < data.length; i++) {
        let ar = this.category.find((x) => data[i].category == x.id);
        this.products.push({
          id: data[i]._id || '',
          name: data[i].productname || '',
          code: data[i].code || '',
          price: data[i].price || 0,
          points: data[i].points || 0,
          count: data[i].count || 0,
          category: ar?.name || '',
          idcategory: data[i].category || '',
          i: i + 1,
          image: environment.backend + '/public/images/' + data[i].image || '',
        });
      }
    });
  }

  actualizar() {
    this.category = [];
    this.productCategoryService.getProductCategorys().subscribe((res) => {
      let data = res as ProductCategory[];

      for (let i = 0; i < data.length; i++) {
        this.category.push({
          id: data[i]._id || '',
          name: data[i].name || '',
          image: data[i].image || '',
        });
      }
      this.getProducts();
    });
  }

  search() {
    // order -  cate - search
    let order = (<HTMLInputElement>document.getElementById('order')).value;
    let cate = (<HTMLInputElement>document.getElementById('cate')).value;
    let search = (<HTMLInputElement>document.getElementById('search')).value;
    let or = order.split('/');
    this.inventoryService
      .getProductSearch(search, 1, 1000, or[0], Number(or[1]), cate)
      .subscribe((res) => {
        let data = res as Inventory[];
        this.products = [];
        for (let i = 0; i < data.length; i++) {
          let ar = this.category.find((x) => data[i].category == x.id);
          this.products.push({
            id: data[i]._id || '',
            name: data[i].productname || '',
            code: data[i].code || '',
            price: data[i].price || 0,
            points: data[i].points || 0,
            count: data[i].count || 0,
            category: ar?.name || '',
            idcategory: data[i].category || '',
            i: i + 1,
            image:
              environment.backend + '/public/images/' + data[i].image || '',
          });
        }
      });
  }

  // ! ----------- Paneles -----------

  rara(op: number) {
    let a =
      document.querySelector('.inf')?.children[0].children[op * 2].children[0]
        .children[0];
    if (a?.classList.contains('noocult')) {
      a.classList.remove('noocult');
    } else {
      a?.classList.add('noocult');
    }
  }

  add_view() {
    this.clear_product();
    this.update = false;
    let panel2 = document.getElementById('panel-category');
    panel2?.classList.add('oculto');
    let background = document.getElementById('background_panel');
    let panel = document.getElementById('panel');
    background?.classList.remove('oculto');
    panel?.classList.remove('oculto');
  }

  add_category() {
    let panel2 = document.getElementById('panel');
    panel2?.classList.add('oculto');
    let background = document.getElementById('background_panel');
    let panel = document.getElementById('panel-category');
    background?.classList.remove('oculto');
    panel?.classList.remove('oculto');
  }

  close() {
    let background = document.getElementById('background_panel');
    let panel2 = document.getElementById('panel-category');
    let panel = document.getElementById('panel');
    background?.classList.add('oculto');
    panel2?.classList.add('oculto');
    panel?.classList.add('oculto');
  }

  // ! ----------- Producto -----------

  create_product() {
    let name = (<HTMLInputElement>document.getElementById('name_product'))
      .value;
    let category = (<HTMLInputElement>(
      document.getElementById('category_product')
    )).value;
    let count = (<HTMLInputElement>document.getElementById('count_product'))
      .value;
    let code = (<HTMLInputElement>document.getElementById('code_product'))
      .value;
    let price = (<HTMLInputElement>document.getElementById('price_product'))
      .value;
    let points = (<HTMLInputElement>document.getElementById('points_product'))
      .value;
    let file = (<HTMLInputElement>(
      document.getElementById('file_product')
    )).files?.item(0);

    let data = new Inventory(
      undefined,
      code,
      name,
      Number(count),
      category,
      Number(price),
      Number(points),
      undefined,
      undefined
    );
    delete data._id;
    delete data.image;
    if (this.verifyProduct(name, category, count, code, price, points)) {
      if (file) {
        this.inventoryService.postInventoryI(data, file).subscribe((res) => {
          this.getProducts();
          alert('Producto Creado')
        });
      } else {
        this.inventoryService.postInventory(data).subscribe((res) => {
          this.getProducts();
          alert('Producto Creado')
        });
      }
    }
  }

  verify(name: string,value: string,min: number,max: number,type: string): boolean {
    if (value) {
      if (type == 'string') {
        let size = value.length;
        if (size < min) {
          alert(`${name} debe contener almenos ${min} caracteres`);
          return false;
        } else if (size > max) {
          alert(`${name} debe NO puede tener ${max} caracteres`);
          return false;
        } else {
          return true;
        }
      } else if (type == 'number') {
        let number = Number(value);

        if (number < min) {
          alert(`${name} debe ser mayor a ${min}`);
          return false;
        } else if (number > max) {
          alert(`${name} debe ser menor a ${max}`);
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      alert(`${name} No puede estar vacio`);
      return false;
    }
  }

  verifyProduct(name: string,category: string,count: string,code: string,price: string,points: string): boolean {
    if (!this.verify('Nombre', name, 2, 100, 'string')) {return false;}
    if (!this.verify('Category', category, 2, 100, 'string')){return false;}
    if (!this.verify('Cantidad', count, 0, 9999999999999999999999999999, 'number')){return false;}
    if (!this.verify('Codigo', code, 2, 100, 'string')) {return false;}
    if (!this.verify('Precio', price, 1, 9999999999999999999999999999, 'number')) {return false;}
    if (!this.verify('Puntos', points, 0, 9999999999999999999999999999, 'number')) {return false;}
    return true;
  }

  get_product() {}

  update_product() {
    let idc = (<HTMLInputElement>document.getElementById('id_product')).value;
    let name = (<HTMLInputElement>document.getElementById('name_product'))
      .value;
    let image = (<HTMLInputElement>document.getElementById('image_product'))
      .value;
    let category = (<HTMLInputElement>(
      document.getElementById('category_product')
    )).value;
    let count = (<HTMLInputElement>document.getElementById('count_product'))
      .value;
    let code = (<HTMLInputElement>document.getElementById('code_product'))
      .value;
    let price = (<HTMLInputElement>document.getElementById('price_product'))
      .value;
    let points = (<HTMLInputElement>document.getElementById('points_product'))
      .value;
    let file = (<HTMLInputElement>(
      document.getElementById('file_product')
    )).files?.item(0);
    let data = new Inventory(
      undefined,
      code,
      name,
      Number(count),
      category,
      Number(price),
      Number(points),
      undefined,
      undefined
    );
    delete data._id;
    if (this.verifyProduct(name, category, count, code, price, points)) {
      if (file) {
        var picture = image.split('/');
        data.image = picture[picture.length - 1];
        this.inventoryService
          .putInventoryI(data, file, idc)
          .subscribe((res) => {
            this.getProducts();
          });
      } else {
        delete data.image;
        this.inventoryService.putInventory(data, idc).subscribe((res) => {
          this.getProducts();
          alert('Producto Actualizado')
        });
      }
      this.getProducts();
    }
  }

  delete_product(id: string) {
    this.inventoryService.deleteInventory(id).subscribe((res) => {
      this.getProducts();
      alert('Producto eliminado')
    });
  }

  clear_product() {
    let idc = <HTMLInputElement>document.getElementById('id_product');
    idc.value = '';
    let name = <HTMLInputElement>document.getElementById('name_product');
    name.value = '';
    let image = <HTMLInputElement>document.getElementById('image_product');
    image.value = '';
    let category = <HTMLInputElement>(
      document.getElementById('category_product')
    );
    category.value = '';
    let count = <HTMLInputElement>document.getElementById('count_product');
    count.value = '';
    let code = <HTMLInputElement>document.getElementById('code_product');
    code.value = '';
    let price = <HTMLInputElement>document.getElementById('price_product');
    price.value = '';
    let points = <HTMLInputElement>document.getElementById('points_product');
    points.value = '';
    let file = <HTMLInputElement>document.getElementById('file_product');
    file.files = null;
    this.photoSelected = [this.imageDefatult, this.imageDefatult];
  }

  refill_product(id: string) {
    this.add_view();
    let x = this.products.find((x) => x.id == id);
    let idc = <HTMLInputElement>document.getElementById('id_product');
    idc.value = x?.id || '';
    let name = <HTMLInputElement>document.getElementById('name_product');
    name.value = x?.name || '';
    let category = <HTMLInputElement>(
      document.getElementById('category_product')
    );
    category.value = x?.idcategory || '';
    let count = <HTMLInputElement>document.getElementById('count_product');
    count.value = x?.count.toString() || '';
    let code = <HTMLInputElement>document.getElementById('code_product');
    code.value = x?.code || '';
    let price = <HTMLInputElement>document.getElementById('price_product');
    price.value = x?.price.toString() || '';
    let points = <HTMLInputElement>document.getElementById('points_product');
    points.value = x?.points.toString() || '';
    let file = <HTMLInputElement>document.getElementById('file_product');
    this.photoSelected[0] = x?.image;
    let image = <HTMLInputElement>document.getElementById('image_product');
    image.value = x?.image || '';
    file.files = null;
    this.update = true;
  }

  // ! ----------- Categoria -----------

  actualize_category() {
    let data = <HTMLInputElement>document.getElementById('action');
    if (data) {
      if (data.value === '1' || data.value === '2') {
        this.categorydata = true;
      } else {
        this.categorydata = false;
      }
      if (data.value === '3' || data.value === '2') {
        this.refill_category();
        this.categoryselect = true;
      } else {
        this.categoryselect = false;
        this.clear_category();
      }
    }
  }

  clear_category() {
    let name = <HTMLInputElement>document.getElementById('name_category');
    name.value = '';
    let file = <HTMLInputElement>document.getElementById('file_category');
    file.files = null;
    this.photoSelected = [this.imageDefatult, this.imageDefatult];
  }

  refill_category() {
    let id = (<HTMLInputElement>document.getElementById('create_id')).value;
    let x = this.category.find((x) => x.id == id);
    let name = <HTMLInputElement>document.getElementById('name_category');
    name.value = x?.name || '';
    let file = <HTMLInputElement>document.getElementById('file_category');
    this.photoSelected[1] = environment.backend + '/public/images/' + x?.image;
    file.files = null;
  }

  select() {
    let data = <HTMLInputElement>document.getElementById('action');
    if (data) {
      if (data.value === '1') {
        this.create_category();
      }
      if (data.value === '2') {
        this.edit_category();
      }
      if (data.value === '3') {
        this.delete_category();
      }

      this.actualizar();
    }
  }

  create_category() {
    let name = (<HTMLInputElement>document.getElementById('name_category'))
      .value;
    let file = (<HTMLInputElement>(
      document.getElementById('file_category')
    )).files?.item(0);

    let data = new ProductCategory();
    data.name = name;
    delete data._id;
    delete data.image;
    data.shopid = localStorage.getItem('shop') || '';
    if(this.verifyCategory(name)){
      if (file) {
        this.productCategoryService
          .postProductCategoryI(data, file)
          .subscribe((res) => { alert('Categoria creada')});
      } else {
        this.productCategoryService
          .postProductCategory(data)
          .subscribe((res) => { alert('Categoria creada')});
      }
    }

  }

  verifyCategory(name: string): boolean {
    if (!this.verify('Nombre', name, 2, 100, 'string')) {return false;}
    return true;
  }

  edit_category() {
    let name = (<HTMLInputElement>document.getElementById('name_category'))
      .value;
    let file = (<HTMLInputElement>(
      document.getElementById('file_category')
    )).files?.item(0);

    let data = new ProductCategory();
    data.name = name;
    delete data._id;
    data.shopid = localStorage.getItem('shop') || '';
    let id = (<HTMLInputElement>document.getElementById('create_id')).value;

    let x = this.category.find((x) => x.id == id);
    data.image = x?.image || '';
    if(this.verifyCategory(name)){
      if (file) {
        this.productCategoryService
          .putProductCategoryI(data, id, file)
          .subscribe((res) => {alert('Categoria Actualizada') });
      } else {
        this.productCategoryService
          .putProductCategory(data, id)
          .subscribe((res) => {alert('Categoria Actualizada')});
      }
    }
  }

  delete_category() {
    let id = (<HTMLInputElement>document.getElementById('create_id')).value;
    this.productCategoryService.deleteProductCategory(id).subscribe(
      (res) => {
        alert('Categoria Eliminada')
        interface as {
          status: string;
        }
        let x = res as as;
        if (x.status) {
          console.log('Que paso mano');
          const lot = this.category.findIndex((x) => {
            x.id === id;
          });
          if (lot != -1) {
            this.category.splice(lot);
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resolveProduct(op: Number) {
    let name = (<HTMLInputElement>document.getElementById('name_product'))
      .value;
    let count = (<HTMLInputElement>document.getElementById('count_product'))
      .value;
    let code = (<HTMLInputElement>document.getElementById('code_product'))
      .value;
    let price = (<HTMLInputElement>document.getElementById('price_product'))
      .value;
    let points = (<HTMLInputElement>document.getElementById('points_product'))
      .value;

    if (name.length <= 0) {
      alert('Error Nombre');
    } else if (Number(count) <= 0) {
      alert('Error Cantidad');
    } else if (code.length <= 0) {
      let x = Math.floor(Math.random() * 100);
      code = x.toString();
    } else if (Number(price) < 0) {
      alert('Error Price');
    } else if (Number(points) < 0) {
      alert('Error Points');
    } else if (op == 0) {
      this.create_product();
    } else {
      this.update_product();
    }
  }

  resolveCategory(op: Number) {
    let name = (<HTMLInputElement>document.getElementById('name_category'))
      .value;
    if (name.length <= 0) {
      alert('Error Nombre');
    } else if (op == 0) {
      this.create_category();
    } else {
      this.edit_category();
    }
  }
}
