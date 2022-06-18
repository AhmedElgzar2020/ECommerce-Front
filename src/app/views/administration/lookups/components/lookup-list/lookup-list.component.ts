import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { NgxTablePopupComponent } from 'app/views/cruds/crud-ngx-table/ngx-table-popup/ngx-table-popup.component';
import { CrudService } from 'app/views/cruds/crud.service';
import { Subscription } from 'rxjs';
import { LookupsService } from '../../services/lookups.service';

@Component({
  selector: 'app-lookup-list',
  templateUrl: './lookup-list.component.html',
  styleUrls: ['./lookup-list.component.scss'],
  animations: egretAnimations
})
export class LookupsListComponent implements OnInit, OnDestroy {
  public items: any[];
  public getItemSub: Subscription;
  translation: any;
  gridTableTranslation: any;
  lookupsTableHeader: any[];
  totalLookupsCount: any;
  lookups: any[];
  filteredLookups: any[] = [];

  isAdvancedSearchOpen: boolean;
  totalCount: number;
  globalSort: { sortField: string; sortDir: number; };
  lookupName: string;
  displayName: string = '';
  gridSize;
  viewModeLink: string;
  constructor(private dialog: MatDialog,private snack: MatSnackBar,private route: ActivatedRoute,private router: Router,private _lookupService: LookupsService,private crudService: CrudService,private confirmService: AppConfirmService,private loader: AppLoaderService) 
  {
    this.route.params.subscribe((params) => {
      this.lookupName = params['lookupName'];
    });
   }

  ngOnInit() {
    this.getItems()
    this.loadLookups();
  }
  loadLookups() {
   
    this._lookupService.getLookups(this.lookupName).subscribe((rs) => {
      this.lookups = rs;
      this.totalLookupsCount = rs.length;
      this.onSuccess(rs, null)
   
    });
  }
  onSuccess(res, pageIndex = null) { 
    if (res && res) {
      this.totalCount = res.totalCount;
      this.filteredLookups = [];
      for (const iterator of res) {
        this.filteredLookups.push(
          {
            id: iterator.id,
            displayName: iterator.displayName,
            uniqueKey:iterator.uniqueKey,
           modifiedAt:"", //iterator.modifiedAt ? this.datePipe.transform(DatetimeHelper.convertToUTCDate(iterator.modifiedAt), DatetimeHelper.datetimeFormat) :  "_",
            modifiedBy: iterator.modifiedByName ? iterator.modifiedByName : "_",
            languagesCount: iterator.languagesCount ? iterator.languagesCount : "_"
          })
      }
    }
    else if (pageIndex != null) {
      this.filteredLookups = [];
    }
  }

  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems() {
    this.getItemSub = this.crudService.getItems()
      .subscribe(data => {
        this.items = data;
      })
  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new member' : 'Update member';
    let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.addItem(res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Added!', 'OK', { duration: 4000 })
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.name}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.removeItem(row)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member deleted!', 'OK', { duration: 4000 })
            })
        }
      })
  }
}