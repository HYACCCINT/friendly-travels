import { inject, Injectable } from "@angular/core";
import { Auth, authState, onAuthStateChanged } from '@angular/fire/auth';
import { map, switchMap, firstValueFrom, filter, Observable } from "rxjs";
import {  doc, docData, DocumentReference, Firestore, getDoc, setDoc, updateDoc, collection, addDoc, deleteDoc, collectionData, Timestamp } from "@angular/fire/firestore";
import { Stop, Travel, TravelRefModel, TravelRef, TravelObject, BaseTravel, StopObject } from "../models/travel.model";
import { Storage, getDownloadURL, ref, uploadBytesResumable } from "@angular/fire/storage";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class TravelService {
 firestore: Firestore = inject(Firestore);
 auth: Auth = inject(Auth);
 storage: Storage = inject(Storage);
 router: Router = inject(Router);

 user$ = authState(this.auth).pipe(filter(user => user !== null), map(user => user!));
  

  async addEmptyTravel(userId: String) {
    const travelData = JSON.parse(JSON.stringify(new TravelObject()));
    travelData.startDate = Timestamp.fromDate(new Date());
    travelData.endDate = Timestamp.fromDate(new Date());
    travelData.isPublic = travelData.isPublic || false;
    travelData.userId = travelData.userId || userId;
    addDoc(collection(this.firestore, 'travels'), travelData).then((travelRef) => {
      collection(this.firestore, `travels/${travelRef.id}/stops`);
      setDoc(travelRef, {... travelData, id: travelRef.id})
      this.router.navigate(['edit', `${travelRef.id}`]);
      return travelRef;
    })
    return 
  }

  async addStop(travelId: string) {
    const stopData = JSON.parse(JSON.stringify(new StopObject()));
    stopData.visitDate = Timestamp.fromDate(new Date());
    
    const ref = await addDoc(collection(this.firestore, `travels/${travelId}/stops`), stopData)
    setDoc(ref, {...stopData, id: ref.id})
  }

  async updateData(path: string, data: Partial<Travel | Stop>) {
    await updateDoc(doc(this.firestore, path), data)
  }

  async deleteData(path: string) {
    const ref = doc(this.firestore, path);
    await deleteDoc(ref)
  }

  getDocData(path: string) {
    return docData(doc(this.firestore, path), {idField: 'id'}) as Observable<Travel | Stop>
  }

  getCollectionData(path: string) {
    return collectionData(collection(this.firestore, path), {idField: 'id'}) as Observable<Travel[] | Stop[]>
  }

  async uploadToStorage(path: string, input: HTMLInputElement, contentType: any) {
    if (!input.files) return null
        const files: FileList = input.files;
        for (let i = 0; i < files.length; i++) {
            const file = files.item(i);
            if (file) {
              const imagePath = `${path}/${file.name}`
            }
        }
        return null
  }

}