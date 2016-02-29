# linter-lein

This package will lint your Clojure files in Atom using by attempting to 
load the file and printing compile time errors. This is what the `lein check`
command does as well.

## Installation

### Leiningen

Before using this package you will need to install the
[`lein-check-stdin`][https://github.com/saulshanabrook/lein-check-stdin] plugin
(and obviously [Leiningen][])


### Plugin installation

The [Linter][] and package will be installed for you to provide an interface
to this package. If you are using an alternative debugging interface that
supports linter plugins simply disable [Linter][].

To install this package either search for it from within Atom's settings menu
or run the following command.

```ShellSession
apm install linter-lein
```

## Settings

All of `linter-lein`'s settings are available from within Atom's settings menu.
If you prefer to manually edit the configuration file the following settings
are available:

*   `leinExecutablePath`: Defaults to `lein`, allowing the `$PATH` to resolve the
    correct location. If you need to override this specify the full path to
    `lein`.

[linter]: https://github.com/atom-community/linter "Linter"
[Leiningen]: https://github.com/technomancy/leiningen "Leiningen"
