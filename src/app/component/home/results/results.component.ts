import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GithubUserDetails } from 'src/app/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: GithubUserDetails }
  ) {}

  ngOnInit(): void {}
}
