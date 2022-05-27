import { Component, OnInit } from '@angular/core';

// import 'jquery';
//
import * as $  from 'jquery';
// declare var $: any;
@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponentComponent implements OnInit {




  constructor( ) {}



  ngOnInit(): void {




    (function($) {
      "use strict"; // Start of use strict

      // Toggle the side navigation
      $("#sidebarToggle, #sidebarToggleTop").on('click', function(e:any) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
          // @ts-ignore
          $('.sidebar .collapse').removeClass('hide');
        }
      });

      // Close any open menu accordions when window is resized below 768px
      $(window).resize(function() {
        // @ts-ignore
        if ($(window).width() < 768) {
          // @ts-ignore
          $(this).removeClass('hide');
        }

        // Toggle the side navigation when window is resized below 480px
        // @ts-ignore
        if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
          $("body").addClass("sidebar-toggled");
          $(".sidebar").addClass("toggled");
          // @ts-ignore
          $('.sidebar .collapse').removeClass('hide');
        }
      });

      // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
      $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e:any) {
        // @ts-ignore
        if ($(window).width() > 768) {
          var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;
          // @ts-ignore
          $(this).scrollTop += (delta < 0 ? 1 : -1) * 30;
          e.preventDefault();
        }
      });

      // Scroll to top button appear
      $(document).on('scroll', function() {
        var scrollDistance = $($).scrollTop();
        // @ts-ignore
        if (scrollDistance > 100) {
          $('.scroll-to-top').fadeIn();
        } else {
          $('.scroll-to-top').fadeOut();
        }
      });

      // Smooth scrolling using jQuery easing
      $(document).on('click', 'a.scroll-to-top', function(e:any) {
        let $anchor = $(document);
        $('html, body').stop().animate({
          // @ts-ignore
          scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
      });

    })($); // End of use strict



  }





}
