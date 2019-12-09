'use strict';

const searchForm = document.forms.searchForm,
      searchInput = searchForm.elements.searchInput,
      repositoryList = document.querySelector('.repository__list'),
      dropDown = document.querySelector('.dropdown'),
      btnFilter = document.querySelector('.btn-filter'),
      btnSort = document.querySelector('.btn-sort');

searchRepositories();