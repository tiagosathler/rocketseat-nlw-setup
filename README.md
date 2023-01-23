# Rocketseat - 11º NLW - Setup - Trilha Ignite

## Projeto Habits

Projeto desenvolvido entre os dias 16 a 22 de Janeiro de 2023 no 11º evento NLW da [Rocketseat](https://www.rocketseat.com.br/) - SETUP - Habits - Trilha Ignite

### Objetivos
>
> Criar aplicações três aplicações para Habits - *de bons hábitos se faz uma vida saudável!*
>
> - **server** - API Rest de consulta e registros dos hábitos;
> - **web** - aplicação frontend de navegação no desktop;
> - **mobile** - aplicação frontend para dispositivos móveis;  

### Tecnologias

#### Server

A API Rest foi desenvolvida em Node com Typescript e as ferramentas [Fastify](https://www.fastify.io/) (servidor), [Prisma](https://www.prisma.io/) (ORM / SQLite), [Zod](https://zod.dev/) (validações), ESLint e Prettier.

#### Web

O frontend para Web / desktop foi desenvolvido em Typescript com [React.js](https://pt-br.reactjs.org/), gerado pelo [Vite.js](https://vitejs.dev/), uma poderosa ferramenta para criação e compilação de aplicações web, [Radix-UI](https://www.radix-ui.com/)  para importar componentes React acessíveis e sem estilos, [TailwindCSS](https://tailwindcss.com/) para estilização, [Phoshor Icons](https://phosphoricons.com/) para usar ícones prontos. Também incorporei o ESLint e Prettier.

#### Mobile

A aplicação em dispositivos móveis foi desenvolvida em [React Native](https://reactnative.dev/) usando a ferramenta [Expo](https://expo.dev/) para criar e buildar a aplicação tanto para dispositivos Android quanto iOS. A estilização foi aprimorada com [NativeWind](https://www.nativewind.dev/) que utiliza o TailwindCSS no React Native. Claro, não poderia faltar ESLint e Prettier.

### Instruções
>
> É necessário ter o Node na versão 16 LTS instalado em sua máquina.

Comece primeiro com o `server`e depois siga com as aplicações frontend.

#### **server**

De dentro da pasta `server`, instale as dependências:

```
npm install
```

Utilize o Prisma para criar o banco de dados em SQLite:

```
npx prisma generate
```

Se necessário, gere o banco de dados e as tabelas:

```
npx prisma migrate
```

Carregue os dados de exemplo:

```
npx db seed
```

Finalmente, **inicie o servidor**:

```
npm run dev
```

Observe se a mensagem abaixo está sendo exibida no seu terminal e indicando no seu terminal.
> `HTTP Server listing on port <http://>{ your ip address }:3333`

**Observação:**
*Toda vez que a aplicação `server` é executada são modificados os arquivos `.env` das aplicações `web` e `mobile` com o respectivo IP de sua máquina para que elas executem perfeitamente. Mas você poderá editá-los com o IP correto de sua máquina*

#### **web**

![](https://github.com/tiagosathler/rocketseat-nlw-setup/tree/master/misc/web.png)
Através de outro terminal, entre na pasta `web` e instale as dependências:

```
npm install
```

Para iniciar o servidor através do Vite execute:

```
npm run dev
```

Entre na página através do caminho [http://localhost:5173/](http://localhost:5173/).

#### **mobile**

![](https://github.com/tiagosathler/rocketseat-nlw-setup/tree/master/misc/mobile.png)

>
>Para executar a aplicação Mobile é necessário ter o **ExpoGo** instalado no seu dispositivo [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&gl=US) ou [iPhone](https://apps.apple.com/br/app/expo-go/id982107779). Obviamente, seu dispositivo deverá estar na mesma rede Wifi de seu roteador. Você também poderá usá-lo através de um emulador Android, se preferir.

De outro terminal, entre na pasta `web`. Instale as dependências:

```
npm install
```

Depois inicie o servidor Expo:

```
npx expo start --clear
```

Com o aplicativo ExpoGo aberto em seu dispositivo móvel, escaneie o QR code exibido.

### Agradecimentos

Agradeço à Rocketseat por esta incrível experiência de fazer aplicações full-stack gratuitamente. A trilha **Ignite** é super desafiadora! Pensei que não daria conta... Foram 5 video-aulas super completas, com os incríveis instrutores [Diego Fernandes](https://www.linkedin.com/in/diego-schell-fernandes/) e [Rodigo Gonçalves](https://www.linkedin.com/in/rodrigo-goncalves-santana/). Aproveitei para relembrar o React e aprender novas ferramentas. Agradeço demais por esta oportunidade e que venham outras. Parabéns Rocketseat :rocket:!
