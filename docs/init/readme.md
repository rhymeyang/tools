## ssh

```shell
ssh-keygen -t ed25519 -C "your_email@example.com"

# legacy system
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Start the ssh-agent in the background
eval "$(ssh-agent -s)"
```

### config

```Text
Host github.com-name1
  AddKeysToAgent yes
  UseKeychain yes
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519


Host github.com-name2
    HostName github.com
    User git
    IdentityFile ~/.ssh/ed25519_name2

Host github.com
  IgnoreUnknown UseKeychain

```

### keychain

```shell
# latest version of MacOS (12.0 Monterey)
ssh-add --apple-use-keychain ~/.ssh/[your-private-key]

# MacOS older than 12.0 Monterey
ssh-add -K ~/.ssh/[your-private-key]
```

## git init

```shell
git config  user.name "rhyme_yang"
git config  user.email "rhyme_yang@live.cn"
git config  user.password
```
