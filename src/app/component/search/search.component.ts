// import {
//   Component,
//   ElementRef,
//   EventEmitter,
//   OnInit,
//   Output,
//   ViewChild,
// } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { DataService } from '../../data.service';

// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.scss'],
// })
// export class SearchComponent implements OnInit {
//   myControl = new FormControl();
//   filteredOptions: Observable<string[]>;
//   allPosts: any[];
//   autoCompleteList: any[];

//   @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
//   @Output() onSelectedOption = new EventEmitter();

//   constructor(private dataService: DataService) {}

//   ngOnInit() {
//     this.dataService.getPosts().subscribe((posts) => {
//       this.allPosts = posts;
//     });

//     this.myControl.valueChanges.subscribe((userInput) => {
//       this.autoCompleteExpenseList(userInput);
//     });
//   }

//   private autoCompleteExpenseList(input) {
//     let categoryList = this.filterCategoryList(input);
//     this.autoCompleteList = categoryList;
//   }

//   filterCategoryList(val) {
//     var categoryList = [];
//     if (typeof val != 'string') {
//       return [];
//     }
//     if (val === '' || val === null) {
//       return [];
//     }
//     return val
//       ? this.allPosts.filter(
//           (s) => s.title.toLowerCase().indexOf(val.toLowerCase()) != -1
//         )
//       : this.allPosts;
//   }

//   displayFn(post: any) {
//     let k = post ? post.title : post;
//     return k;
//   }

//   filterPostList(event) {
//     var posts = event.source.value;
//     if (!posts) {
//       this.dataService.searchOption = [];
//     } else {
//       console.log('not');

//       this.dataService.searchOption.push(posts);
//       this.onSelectedOption.emit(this.dataService.searchOption);
//     }

//     this.focusOnPlaceInput();
//   }

//   removeOption(option) {
//     let index = this.dataService.searchOption.indexOf(option);
//     if (index >= 0) this.dataService.searchOption.splice(index, 1);
//     this.focusOnPlaceInput();

//     this.onSelectedOption.emit(this.dataService.searchOption);
//   }

//   focusOnPlaceInput() {
//     this.autocompleteInput.nativeElement.focus();
//     this.autocompleteInput.nativeElement.value = '';
//   }
// }
