# Github - Twitter
This console application displays Github project names and relative twitts if there are any on Twitter

# Prerequirements

1. open the command line on your machine
2. run the command `node -v` to check your version, the source code was tested in nodejs `v10.15.2` 
3. run the command `npm i` to install all needed dependencies
4. open the file `config.json`
```json 
{
    "twitter": {
        "hostname": "api.twitter.com",
        "path": "/1.1/search/tweets.json",
        "token": "{PUT HERE YOUR TWITTER TOKEN}",
        "form": {
            "grant_type": "client_credentials"
        }
    },
    "github": {
        "hostname": "api.github.com",
        "path": "/search/repositories",
        "userAgent": "node.js"
    }
}
```
5. insert your own **Twitter Token**
6. open the command line on your machine
7. be sure to be in run the command line inside the project folder
8. run the command `npm start` 
9. The main menu will shown

### MAIN MENU
```sh
===============================================================
 1. Type `quit(q)` to exit
 2. Type `search-github(sg)` to search reactive project in github
===============================================================
```
Initially you have 2 commands option, `quit` to quit the application and `search-github` to search **reactive** github projects, these commands can also be used by their alias which are respectively `q` and `sg`

To search **Github** projects type `sg`
You will get a list of **Github** project names similar to the list below:

`> sg`
```sh
Github search in progress...
Total of 10 projects found.
BEGIN LIST
  0.ReactiveCocoa/ReactiveCocoa
  1.dotnet/reactive
  2.reactiveui/ReactiveUI
  3.ReactiveX/RxSwift
  4.ReactiveCocoa/ReactiveSwift
  5.Reactive-Extensions/RxJS
  6.mcharmas/Android-ReactiveLocation
  7.ReactiveCocoa/ReactiveObjC
  8.pwittchen/ReactiveNetwork
  9.AdaptiveConsulting/ReactiveTrader
END LIST
```

A new third menu option will be displayed and added to the previoius menu as shown below
### MAIN MENU with TWITTER search option
```sh
===============================================================
 1. Type `quit(q)` to exit
 2. Type `search-github(sg)` to search reactive project in github
 3. Type `search-twitter -{index of the project}` to retrieve twitts 
 related to the github project or type st -{index of the project}
 `ex: st -1`
===============================================================
```
The third menu option `search-twitter -{index of the project}` allows to research twitts related to the projects selected.
To be able to search for twitts you need to type the command `search-twitter -`  + the **index of the project** for which you want to search on Twitter.
ex.
Lets say we want to search on Twitter the project  **1.dotnet/reactive** which index is **1**
type the command ` search-twitter -1`or you can use the alias `st -1`

You will get the list of twitts related to the project selected, similar to the one below
```sh
> Total of 15 twitts found.
BEGIN LIST
  0. [Wed Mar 06 22:27:41] - @FabianoBaldasso ou reactive game cmo se chama na englaterra 
  1. [Wed Mar 06 22:27:14] - @pato7dominic Lmao... I'm dead... What game plan?? It's not a game plan if you're hoping that the other team puts i… https://t.co/4jCUkl3bfu 
  2. [Wed Mar 06 22:26:35] - RT @TIME: When we take offense we re in reactive ...
END LIST
  ```