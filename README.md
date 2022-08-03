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
  <li>Criar Hooks customizados;</li>
</ul>

<h2 id="descrição-do-projeto">Descrição do Projeto</h2>

<p>
  A aplicação em questão permite que o usuário possa ver, buscar, filtrar, favoritar e acompanhar o progresso de preparação de receitas e drinks, sendo assistido por uma interface agradável e que contribui para a experiência do usuário.
</p>

<h2 id="mapeamento">Mapeamento do site </h2>

<ol>
<li><h4>Login</h4></li> 

<p>
  Para ter acesso às ferramentas do site, o usuário deve digitar um e-mail válido, bem como uma senha de seis dígitos. Este e-mail fica salvo no local storage e pode ser visualizado na área de perfil.
</p>

<p> </p>

<li><h4>Receitas (Food) e Receitas (Drinks)</h4></li> 
<p>
  Após digitar realizar o login de forma efetiva, o usuário tem acesso a duas páginas de funções semelhantes, sendo uma para bebidas e outra para comidas. Esta última é a primeira a ser carregada na tela por padrão, mas o usuário pode alterar para a outra clicando no botão fixo na parte inferior direita.
</p>
<p>
  Cada página possui seis filtros localizados na área superior logo abaixo do cabeçalho e cada um deles traz 12 opções a serem visualizadas e escolhidas pelo usuário. São elas:
</p>
  <ul>Para Comidas:
    <li>All</li>
    <li>Beef</li>
    <li>BreakFast</li>
    <li>Chicken</li>
    <li>Dessert</li>
    <li>Goat</li>
  </ul>
  <ul>Para Bebidas:
    <li>All</li>
    <li>Ordinary Drink</li>
    <li>Cocktail</li>
    <li>Shake</li>
    <li>Others</li>
    <li>Cocoa</li>
  </ul>
<p>
  No cabeçalho, há duas outras opções disponíveis: O ícone de perfil redireciona o usuário para a área de perfil e o ícone de pesquisa permite que o usuário busque receitas ou bebidas, seja pelo ingrediente, nome ou primeira letra.
</p>
<p>
  Por fim, caso o usuário clique em uma das bebidas ou comidas disponibilizadas, ele é redirecionado para a página de detalhes.
</p>


<br>
<p>Ao clicar uma vez, o item da lista selecionado é adicionado e pode ser visualizado em um pop-up no canto superior direito da tela. Ele pode ser removido clicando novamente no ícone ou desmarcando o checkbox referente ao mesmo no pop-up.</p>
<p>Ao clicar em buscar, a aplicação retorna uma lista com todos os dons que se adequam aos filtros selecionados.</p>

a seu perfil, onde poderá ver informações como e-mail cadastrado, receitas prontas e favoritas, assim como fazer logout. 

<li><h4>Rituais</h4></li>

<p> Área do site ainda em processo de construção.</p>

<li><h4>Fetiches</h4></li>

<p> Área do site ainda em processo de construção.</p>

<li><h4>Parceiros</h4></li>

<p>Nesta página é disponibilizada uma lista de todos os parceiros dos grupos ao qual os desenvolvedores pertencem ou possuem uma grande proximidade. É possível encontrar todos os links de contato com estes parceiros, além de uma breve descrição dos mesmos e uma imagem da logo que os representa.</p>

<li><h4>Garou Nordeste</h4></li>

<p> Área do site ainda em processo de construção.</p>

<li><h4>Matilha da Kombi</h4></li>

<p> Área do site ainda em processo de construção.</p>

<li><h4>Tribos</h4></li>

<p> Área do site onde são disponibilizadas as dezessete tribos para consulta. Em uma lista no formato carrossel, o usuário poderá navegar entre as imagens de cada tribo, além de, no futuro, ter acesso a informações sobre a tribo ao clicar em uma delas.</p>

<li><h4>Augúrios</h4></li>

<p> Área do site onde são disponibilizados os cinco Augúrios para consulta. Em uma lista no formato carrossel, o usuário poderá navegar entre as imagens de cada augúrio, além de, no futuro, ter acesso a informações ao clicar em uma delas.</p>

<li><h4>Raças</h4></li>

<p> Área do site onde são disponibilizadas as três raças para consulta. Em uma lista no formato carrossel, o usuário poderá navegar entre as imagens de cada raça, além de, no futuro, ter acesso a informações e pontos de vista dos autores ao clicar em um deles.</p>

<li><h4>Quem Somos</h4></li>

<p> Lugar reservado para falarmos um pouco a respeito de quem somos, quem são nossos grupos e como tudo começou, além de serem compartilhados todos os nossos links de contato.</p>

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

<h2 id="pessoas-envolvidas">Desenvolvedores e demais contribuidores</h2>

* <strong>Bruno Gabryell Cabral da Silva</strong> - Desenvolvedor Web - React e Tailwind CSS;
* <strong>Bruno Gabryell Cabral da Silva</strong> - Desenvolvedor Web - React;
* <strong>Bruno Gabryell Cabral da Silva</strong> - Desenvolvedor Web - React;
* <strong>Bruno Gabryell Cabral da Silva</strong> - Desenvolvedor Web - React;

<h2 id="conclusão">Conclusão</h2>

<p>Programar é um eterno aprendizado. Quanto mais se pratica, mais se melhora. Praticar conceitos de programação com coisas que se é apaixonado apimenta ainda mais a relação! Muitos aprendizados novos são adicionados a cada dia, fazendo com que este projeto já tenha valido a pena antes mesmo de ser concluído!</p>
