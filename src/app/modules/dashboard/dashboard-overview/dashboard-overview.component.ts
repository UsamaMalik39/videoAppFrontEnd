import { UserServiceService } from './../../../services/userService/user-service.service';
import { DashboardService } from './../../../services/dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {

  dashboardListings:dashBoardData[]=[];
  userName:string='';
  openDropDown:boolean=false;
  searchString:string='';
  isCreator:boolean=false;
  selectedTab:string='ALL';
  dashboardStata: dashboardStatsData=new dashboardStatsData()
  constructor(                    
    private router:Router,
    private _dashboardService:DashboardService,
    private _userService:UserServiceService
    ) { }

  ngOnInit(): void {
    this.getData();
    this.getStats()
    this.userName=this._userService.legalName;
    this.isCreator=this._userService.isCreator;
  }

  getData(){
    this.dashboardListings=[]
    this._dashboardService.getDashboardData(this.searchString).subscribe((x)=>{
      if(x.success && x.data){
        this.dashboardListings=x.data;
      }

    })
  }

  getStats(){
    this._dashboardService.getDashboardStats().subscribe((x:any)=>{
      if(x.success && x.data){
        this.dashboardStata=x.data;
      }
    })
  }


  openVideo(videoID:number){
    const result = window.location.origin + '/dashboard/view-video?media='+ videoID;
    this.router.navigate(['/dashboard/view-video/'+ videoID]);
    // window.open(result,"_self");
  }

  searchMovie(){
    this.getData();
  }




}

export class dashBoardData{
  genre:string='';
  movies:movieData[]=[];
}

export class movieData{
  title:string='';
  producer:string='';
  rating:string='';
  thumbnail:string='';
  path:string='';
  videoID:number=0;

}


export class dashboardStatsData{
  totalVideos: number=0;
  genres: number=0;
  yourVideos: number=0;
}