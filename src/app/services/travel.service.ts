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
 
  

  async addEmptyTravel(userId: String) {
    const travelData = JSON.parse(JSON.stringify(new TravelObject()));
    travelData.startDate = Timestamp.fromDate(new Date());
    travelData.endDate = Timestamp.fromDate(new Date());
    travelData.isPublic = travelData.isPublic || false;
    travelData.userId = travelData.userId || userId;
    return 
  }

  async addStop(travelId: string) {
    const stopData = JSON.parse(JSON.stringify(new StopObject()));
    stopData.visitDate = Timestamp.fromDate(new Date());
  }

  async updateData(path: string, data: Partial<Travel | Stop>) {
  }

  async deleteData(docRef: DocumentReference<Travel | Stop>) {
  }

  getDocData(path: string) {
  }

  getCollectionData(path: string) {
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

  async deleteDoc(path: string) {
  }

}