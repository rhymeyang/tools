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
Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519

Host github.com-somename
    HostName github.com
    User git
    IdentityFile ~/.ssh/ed25519_somename

Host github.com
  IgnoreUnknown UseKeychain

```

### keychain

```shell
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

## git init

```shell
git config  user.name "rhyme_yang"
git config  user.email "rhyme_yang@live.cn"
git config  user.password
```
