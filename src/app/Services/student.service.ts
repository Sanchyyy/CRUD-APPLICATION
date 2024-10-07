import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Student {
  id: number;
  brand: string;
  model: string;
  year: number;
}

export interface StudentResponse{
  "brand":string,
  "model":string,
  "year":string,
  "id":number

}
export interface StudentResponseType{
  status: Number,
  students: StudentResponse[]
}
export interface StudentResponse{
  status:Number,
  student:StudentResponse

}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) {}

  getStudents(){

    return this.httpClient.get<StudentResponseType>('http://localhost:3000/users');

  }

  getStudent(studentId :number){
    console.log("===getStudent=");
    console.log(studentId);
    let url=`http://localhost:3000/users/${studentId}/edit`;
    console.log(url);
    return this.httpClient.get<StudentResponseType>(`http://localhost:3000/users/${studentId}/edit`);

  }

  saveCar(inputData: object){
    console.log(" input data");
    console.log(inputData);
    return  this.httpClient.post('http://localhost:3000/users',inputData);
  }

  UpdateCar(inputData: any , studentId:number){
    console.log("updating====");
    console.log(inputData);
    console.log(studentId);

    return this.httpClient.put(`http://localhost:3000/users/update/${studentId}` ,inputData);
  }

  destroyStudent(studentId: Number){

    return this.httpClient.delete(`http://localhost:3000/users/delete/${studentId}`);

  }


}
