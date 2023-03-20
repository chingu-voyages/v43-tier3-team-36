# Contributing

Welcome to the Marvel Collector repo! This file will acts as a guild to follow when if you want to contribute code to the project.

## Folder and file name

Folder and file naming should follow the Google JS stlye guide

https://google.github.io/styleguide/jsguide.html#file-name

### React Components

The naming of React components should be in **CamelCase** and follow this convention -

`(Page | Context) ComponentName`

_where parenthesis '()' is used are considered optional to include_

_For example_

SearchFilterSelect

(Context|ComponentName)

_or_

ComicCollections

(ComponentName)

**Terms:**

- **Page/Context:** where this component is supposed to be used
- **ComponentName:** what the responsibility of this component is

Also, React components need to be in their separate folder -

`ComponentName/ComponentName.tsx`

It should also include an "entry" file to export your component -

`ComponentName/index.tsx`

_where 'index.tsx' exports your component as a default export_

## Variable naming

Variable naming should also follow the Google JS stlye guide

https://google.github.io/styleguide/jsguide.html#naming-rules-by-identifier-type

## Commit message

Ensure you follow convential commits convention when writing commits

https://www.conventionalcommits.org/en/v1.0.0/

## Branches

Feature/working branches should always be created from the `development` branch. Always make sure you have the most up-to-date development branch before creating
a new branch from it

Names for new working branches should follow this format -

(_feature_ | _bug-fix_ | _update_) / issue-(_issue-number_) / _name-of-work_

_For example_

feature/issues-01/filter-comic

_or_

bug-fix/issue-980/get-comic-list

## Pull Requests

The process for creating a new PR is as follows

- Create a new branch from `development`, making sure yoour `development` branch is up to date. Do this with `git pull`
- Do the required work on your new branch
- Commit the work to your branch and push to Github
- Create PR into `development` branch

Some useful point to remember

- Pull requests must always be targeting the `development` branch.
- Pull requests need to be approved by at least one other member of the team before they can be merged
- Any checks must pass before the request can be merged
- Please add a description on each pull request to let us know what the work is.
- Please add a `Closes` tag followed by the issue number that the PR is linked to. _For example_ `Closes #138`. This will link the PR to the issue.
- Try to make each PR as focuses as possible. E.g try to have only one feature/bug-fix/update in a PR
