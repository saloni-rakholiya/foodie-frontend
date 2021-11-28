import Navbar from "../components/navbar";
import "../styles/welcome.css";

const WelcomePage = () => {
  return (
    <>
      <Navbar/>
      <div class="container">
<div class="row">

<div class="col">	
<article class="contain">
  <section class="pizza-hover">
    <div class="pizza-box">
      <div class="pizza-box-side left-side"></div>
      <div class="pizza-box-side right-side"></div>
      <div class="pizza-box-side front-side"></div>
      <div class="pizza-box-side back-side"></div>
      <div class="lid">
        <span>PIZZA</span>
      </div>
      <div class="lid-underside"></div>
      <div class="pizza">
        <div class="sauce">
          <div class="toppings">
            <div class="mozzarella"></div>
            <div class="mushroom"></div>
            <div class="mozzarella"></div>
            <div class="basil"></div>
            <div class="mozzarella"></div>
            <div class="basil"></div>
            <div class="mushroom"></div>
            <div class="mozzarella"></div>
            <div class="mushroom"></div>
            <div class="mozzarella"></div>
            <div class="basil"></div>
            <div class="mozzarella"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</article>
</div>

<div class="col text-center p-5">
	<h1 className="foodieheading m-5">FOODIE</h1>
	<p className="foodielittleheading">An Oasis Of Pleasure </p>
<a href="/" class="">Get started!</a>
</div>

</div>
</div>
    </>
  );
};

export default WelcomePage;
