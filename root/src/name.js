###
 {%= name %}
 {%= homepage %}
 
 Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
###
class Hello
        constructor: () ->

        message: () ->
                return "Hello coffee!"

window.Hello = Hello
                

