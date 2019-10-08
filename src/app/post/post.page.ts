// import { WordpressService } from '../services/wordpress.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordpressService } from '../wordpress.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
 
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  post: any;
 
  constructor(private route: ActivatedRoute, private wp: WordpressService, private socialSharing: SocialSharing) { }
 
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.wp.getPostContent(id).subscribe(res => {
      this.post = res;
    });
  }

  share(){
    var url =  this.post.link
    var message = "I found this interesting!"
    this.socialSharing.shareViaWhatsApp(message, url);
}
 
  // openOriginal() {
  //   // Add InAppBrowser for app if want
  //   window.open(this.post.link, '_blank');
  // }
}