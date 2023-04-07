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

  user$ = authState(this.auth).pipe(
    filter(user => user !== null),
    map(user => user!),
  );
  

  private setDefaultTravel(travel: BaseTravel, userId: String): BaseTravel {
    travel.isPublic = travel.isPublic || false;
    travel.userId = travel.userId || userId;
    return {...travel};
  }

  async addEmptyTravel(userId: String): Promise<TravelRef> {
    const travelData = JSON.parse(JSON.stringify(new TravelObject()));
    travelData.startDate = travelData.startDate || Timestamp.now();
    travelData.endDate = travelData.endDate || Timestamp.now();
    travelData.isPublic = travelData.isPublic || false;
    travelData.userId = travelData.userId || userId;
    return addDoc(collection(this.firestore, 'travels'), travelData).then((travelRef) => {
      collection(this.firestore, `travels/${travelRef.id}/stops`);
      setDoc(travelRef, {...travelData, id: travelRef.id})
      this.router.navigate(['edit', `${travelRef.id}`]);
      return travelRef;
    });
  }

  async addStop(travelId: string) {
    const stopData = JSON.parse(JSON.stringify(new StopObject()));
    stopData.visitDate = stopData.visitDate || Timestamp.now();
    const ref = await addDoc(collection(this.firestore, `travels/${travelId}/stops`), stopData);
    setDoc(ref, {...stopData, id: ref.id})
  }

  async updateData(path: string, data: Partial<Travel | Stop>) {
    updateDoc(doc(this.firestore, path), data);
  }

  async deleteData(docRef: DocumentReference<Travel | Stop>) {
    await deleteDoc(docRef);
  }

  getDocData(path: string) : Observable<Travel | Stop> {
    return docData(doc(this.firestore, path), {idField: 'id' }) as Observable<Travel | Stop>;
  }

  getCollectionData(path: string): Observable<Travel[] | Stop[]> {
    return collectionData(collection(this.firestore, path), {idField: 'id' })as Observable<Travel[] | Stop[]>
  }

  uploadToStorage(path: string, input: HTMLInputElement, contentType: any) {
    if (!input.files) return null

        const files: FileList = input.files;
        for (let i = 0; i < files.length; i++) {
            const file = files.item(i);
            if (file) {
              const imagePath = `${path}/${file.name}`
                const storageRef = ref(this.storage, imagePath);
                uploadBytesResumable(storageRef, file, contentType);
                console.log(storageRef.fullPath, "@#@!#!@!");
                return storageRef.fullPath;
            }
        }
        return null
  }

  async deleteDoc(path: string) {
    const ref = await doc(this.firestore, path);
    deleteDoc(ref);
  }

  async getImageFromStorage(path: string) {
    return await getDownloadURL(ref(this.storage, path));
  }
}