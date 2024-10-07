import { Component } from '@angular/core';
import { StudentService , StudentResponse} from 'src/app/Services/student.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})

export class StudentPageComponent {
  constructor(private studentService : StudentService){}
  students!: StudentResponse[];
  
  ngOnInit(){
    this.getStudentLists(); // Fetch student data
    this.postList(); // Fetch data for pagination
  }
  getStudentLists(){
    this.studentService.getStudents().subscribe((res:any) =>{
      console.log(res);
      this.students=res;

    });
  }
  deleteCar(event :any ,studentId:Number){
    if(confirm('Are you sure you want to delete this data?'))
    {
      event.target.innerText= "Deleting...";

      this.studentService.destroyStudent(studentId).subscribe((res:any)=>{
        this.getStudentLists();
        console.log("Deleted");

      });

    }
  }
  // Define variables
  searchText='';// Variable for search input

  title = 'pagination'; // Title for pagination
  POSTS: any; // Variable to store fetched data
  page = 1; // Current page number
  count = 0; // Total number of items
  tableSize = 10; // Number of items to display per page
  tableSizes = [5, 10, 15, 20]; // Options for items per page

  sortColumn: string | null = null; // Column to sort by
  sortDirection: string = ''; // Sort direction

  // Fetch data for pagination
  postList():void{
    this.studentService.getStudents().subscribe((response)=>{
      this.POSTS=response;
      console.log(this.POSTS);



    });
  }

  // Handle page change
  onTableDataChange(event:any){
    this.page=event;
    this.postList();
  }
// Handle items per page change
  onTableSizeChange(event:any):void{
    this.tableSize = event.target.value; // Update items per page
    this.page = 1; // Reset current page to 1
    this.postList(); // Fetch data for first page
  }

  //sorrting
  onSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }
}
  
  


  

  



