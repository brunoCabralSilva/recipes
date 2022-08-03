<h1 align="center">Recipes</h1>

<p align="center">
Aplicação de receitas que utiliza o que há de mais moderno dentro do ecossistema React: Hooks e Context API!
</p>

<h3 align="center">https://brunocabralsilva.github.io/trybe-20-recipes/</h3>

![Tela Inicial da Aplicação](src/images/Login.png)

<p align="center">
<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
</p>

<h2> Índice</h2>

* [Introdução](#intro)
* [Descrição do Projeto](#descrição-do-projeto)
* [Mapeamento do Site](#mapeamento)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Desenvolvedores e demais contribuidores](#pessoas-envolvidas)
* [Conclusão](#conclusão)

<h2 id="intro">Introdução</h2>

<p>Visando a evolução e aprendizado dentro dá área de front end, a trybe nos direcionou a criar uma aplicação onde fosse possível:</p>
<ul>
  <li>Utilizar Redux para gerenciar estado;</li>
  <li>Utilizar a biblioteca React-Redux;</li>
  <li>Utilizar a Context API do React para gerenciar estado;</li>
  <li>Utilizar o React Hook useState;</li>
  <li>Utilizar o React Hook useContext;</li>
  <li>Utilizar o React Hook useEffect;</li>
  <li>Criar Hooks customizados.</li>
</ul>

<h2 id="descrição-do-projeto">Descrição do Projeto</h2>

<p>
  A aplicação em questão permite que o usuário possa ver, buscar, filtrar, favoritar e acompanhar o progresso de preparação de receitas e drinks, sendo assistido por uma interface agradável e que contribui para a sua experiência.
</p>

<h2 id="mapeamento">Mapeamento do site </h2>

<ol>
<li><h4>Login</h4></li> 

<p>
  Para ter acesso às ferramentas do site, o usuário deve digitar um e-mail válido, bem como uma senha com mais de seis dígitos. Este e-mail fica salvo no localStorage e pode ser visualizado na área de perfil. Contanto que não faça logout, sempre que o usuário entrar com seu dispotivo utilizando este e-mail, toda a jornada e interação que teve com a aplicação continuará de onde parou.
</p>

<li><h4>Receitas e Drinks</h4></li> 
<p>
  Após digitar realizar o login de forma efetiva, o usuário tem acesso a duas páginas de funções semelhantes, sendo uma que disponibiliza uma lista de bebidas e outra uma lista de comidas. Esta última é a primeira a ser carregada na tela por padrão, mas o usuário pode alterar para a de drinks clicando no botão fixo na parte inferior direita.
</p>
<p>
  Cada página possui seis filtros localizados na área superior logo abaixo do cabeçalho e cada um deles traz 12 opções a serem visualizadas e escolhidas pelo usuário. São elas:
</p>
  <br>
  <p>Para Comidas:</p>
  <ul>
    <li>All</li>
    <li>Beef</li>
    <li>BreakFast</li>
    <li>Chicken</li>
    <li>Dessert</li>
    <li>Goat</li>
  </ul>
  <br>
  <p>Para Bebidas:</p>
  <ul>
    <li>All</li>
    <li>Ordinary Drink</li>
    <li>Cocktail</li>
    <li>Shake</li>
    <li>Others</li>
    <li>Cocoa</li>
  </ul>
<p>
  No cabeçalho, há duas outras opções disponíveis: O ícone de perfil redireciona o usuário para uma área que possui suas informações e o ícone de pesquisa permite que o usuário busque receitas ou bebidas, seja pelo ingrediente, nome ou primeira letra.
</p>
<p>
  Por fim, caso o usuário clique em uma das bebidas ou comidas disponibilizadas, ele é redirecionado para a página de detalhes.
</p>

<li><h4>Detalhes</h4></li>
<p>
  Ao clicar em uma comida ou bebida disponibilizada pela aplicação, o usuário é redirecionado para uma página com detalhes sobre a mesma. Aém de uma imagem ampliada do item e seu nome, o usuário pode o passo a passo da receita ou drink e, segundo sua vontade, favoritar ou compartilhá-la.
<p>
<p>
  Caso queira realizar a receita ou drink com a ajuda da aplicação, ele pode clicar em Continue/Start Recipe.
</p>
<li><h4>Em Progresso</h4></li>
<p>
  Assim como na tela anterior, o usuário poderá visualizar nesta página uma imagem ampliada da receita ou drink e o nome dela/dele, somado agora a uma descrição de como prepará-lá. Abaixo das opções de favoritar e compartilhar que também continuam disponíveis, existe um passo a passo de como concluir a receita, onde cada item possui um checkbox que pode ser marcado ao ser concluído. Estas marcações ficam salvas no localStorage e mesmo que o usuário atualize ou saia do aplicativo, elas continuarão marcadas e ele poderá continuar de onde parou se for o caso (a não ser que o usuário clique em logout, o que apagará tudo o que ficou salvo no e-mail cadastrado).
</p>
<p>
 Ao marcar todos os itens do passo a passo, um botão de "finalizar" será habilitado para o usuário no canto inferior direito, que o direcionará para a página de receitas e drinks concluídos.
</p>

<li><h4>Concluídas</h4></li>
<p>
  Página destinada a exibir todas as receitas e drinks que o usuário concluiu, ou seja, seguiu e marcou todos os tópicos do passo a passo até completar todos. O usuário pode filtrar as receitas concluídas por bebida, comida, ou ambas as opções.
</p>
<p>
  Para cada item concluído, é possível verificar a data desta ação e também compartilhá-lo.
</p>

<li><h4>Favoritos</h4></li>
<p>
  Página destinada a exibir todas as receitas favoritadas pelo usuário. Estas podem ser filtradas por bebida, comida, ou ambas as opções. O usuário tem acesso a esta página por meio da página de perfil.
</p>

<li><h4>Perfil</h4></li>
<p>
  Área destinada a apresentar algumas informações do usuário, como o e-mail que ele disponibilizou ao realizar o login, suas receitas concluídas e também as receitas favoritas. Há também a opção de logout, onde o usuário limpará do localStorage todas as informações salvas e nenhum registro restará sobre a sua jornada na aplicação.
</p>

</ol>

<h2 id="tecnologias-utilizadas">Tecnologias utilizadas</h2>

* `HTML5`
* `CSS3`
* `Javascript (ECMAScript 2018)`
* `React`
* `React Icons`
* `React Router Dom`
* `React Context`
* `Framer Motion`
* `Tailwind CSS`
* `Swiper`

<h2 id="pessoas-envolvidas">Desenvolvedores e demais contribuidores</h2>

* <strong>Bruno Gabryell Cabral da Silva</strong> - Desenvolvedor Web - React e Tailwind CSS;
* <strong>Thiago Gasparini</strong> - Desenvolvedor Web - React;
* <strong>Roiney Beal</strong> - Desenvolvedor Web - React;
* <strong>Thiago Flexa</strong> - Desenvolvedor Web - React;
* <strong>Thiago Carvalho</strong> - Desenvolvedor Web - React;

<h2 id="conclusão">Conclusão</h2>

<p>Programar é um eterno aprendizado. Quanto mais se pratica, mais se melhora. Praticar conceitos de programação com coisas que se é apaixonado apimenta ainda mais a relação! Muitos aprendizados novos são adicionados a cada dia, fazendo com que este projeto já tenha valido a pena antes mesmo de ser concluído!</p>
