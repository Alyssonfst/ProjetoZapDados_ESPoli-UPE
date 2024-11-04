import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtro-component',
  templateUrl: './filtro-component.component.html',
  styleUrls: ['./filtro-component.component.css']
})
export class FiltroComponentComponent implements OnInit {
  @Input() uniqueUsers: string[] = [];
  @Input() selectedUser: string = 'all';
  @Input() placeholder: string = 'Buscar usuários';

  @Output() filterChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();

  searchTerm: string = '';

  constructor() {}

  ngOnInit(): void {}

  onFilterChange(username: string): void {
    this.filterChange.emit(username);
  }

  onSearchChange(event: any): void {
    this.searchTerm = event.target.value;
    this.searchChange.emit(this.searchTerm);
  }

  getFilteredUsers(): string[] {
    if (!this.searchTerm) return [];
    return this.uniqueUsers.filter(user =>
      user.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
