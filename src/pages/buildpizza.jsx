import "../styles/pizza.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cart from "../models/cart";
import Navbar from "../components/navbar";
import useSWR from "swr";
import { fetcher } from "../utils";
import Loading from "../components/loader";
import { toast } from "react-toastify";

const BuildPizza = () => {
  const [pepp, setPepp] = useState(1);
  const [greenpepp, setGreenPepp] = useState(1);
  const [mush, setMush] = useState(1);
  const [whitsauce, setWhitesauce] = useState(1);
  const [crustt, setCrust] = useState(1);

  const { data: isAuth, error: authError } = useSWR(
    "http://localhost:3001/checkauth",
    fetcher
  );

  const submitPizza = async () => {
    const description = `Pepperonni: ${
      pepp === 0 ? "No" : "Yes"
    }\nGreen Peppers: ${greenpepp === 0 ? "No" : "Yes"}\nMushroom: ${
      mush === 0 ? "No" : "Yes"
    }\nWhite Sauce: ${whitsauce === 0 ? "No" : "Yes"}\nGluten-free Crust: ${
      crustt === 0 ? "No" : "Yes"
    }\n`;
    const price =
      200 +
      pepp * 10 +
      mush * 10 +
      greenpepp * 10 +
      whitsauce * 30 +
      crustt * 50;
    const category = "User";
    const imagePath = "http://localhost:3001/custompizza.png";
    if (title === "") {
      toast.warning("Title cannot be empty", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }
    const res = await fetch("http://localhost:3001/userpizza", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ title, description, price, category, imagePath }),
    });
    const json = await res.json();
    if (json.status) {
      toast.success(json.message, { position: toast.POSITION.BOTTOM_LEFT });
    } else {
      toast.error(json.message, { position: toast.POSITION.BOTTOM_LEFT });
    }
  };
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  if (authError) {
    return <h1>Error</h1>;
  }
  if (!isAuth) {
    return <Loading />;
  }
  if (isAuth.status === false) {
    navigate("/login");
  }

  return (
    <>
      <Navbar isAdmin={isAuth.isAdmin} isLoggedIn={isAuth.status} />

      <div class="panel controls">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ul>
          <li>
            <button
              class="btn btn-pepperonni active"
              onClick={() => setPepp(!pepp)}
            >
              Pepperonni
            </button>
          </li>
          <li>
            <button
              class="btn btn-mushrooms active"
              onClick={() => setMush(!mush)}
            >
              Mushrooms
            </button>
          </li>
          <li>
            <button
              class="btn btn-green-peppers active"
              onClick={() => setGreenPepp(!greenpepp)}
            >
              Green peppers
            </button>
          </li>
          <li>
            <button
              class="btn btn-sauceyy active"
              onClick={() => setWhitesauce(!whitsauce)}
            >
              White sauce
            </button>
          </li>
          <li>
            <button
              class="btn btn-crust active"
              onClick={() => setCrust(!crustt)}
            >
              Gluten-free crust
            </button>
          </li>
        </ul>
      </div>
      <aside class="panel price">
        <h2>Your pizza's price</h2>

        <b>Rs.200 cheese pizza</b>
        <ul>
          {pepp && <li>Rs.10 pepperonni</li>}
          {mush && <li>Rs.10 mushrooms</li>}
          {greenpepp && <li>Rs.10 green peppers</li>}
          {whitsauce && <li>Rs.30 white sauce</li>}
          {crustt && <li>Rs.50 gluten-free crust</li>}
        </ul>
        <strong>
          Rs.
          <span id="totalPrice">
            {200 +
              pepp * 10 +
              mush * 10 +
              greenpepp * 10 +
              whitsauce * 30 +
              crustt * 50}
          </span>
        </strong>
        <button onClick={submitPizza} className="btn btn-primary">
          Add to Cart
        </button>
      </aside>

      <div id="pizza">
        {greenpepp && (
          <>
            <section class="green-pepper one"></section>
            <section class="green-pepper two"></section>
            <section class="green-pepper three"></section>
            <section class="green-pepper four"></section>
            <section class="green-pepper five"></section>
            <section class="green-pepper six"></section>
            <section class="green-pepper seven"></section>
            <section class="green-pepper eight"></section>
            <section class="green-pepper nine"></section>
            <section class="green-pepper ten"></section>
            <section class="green-pepper eleven"></section>
            <section class="green-pepper twelve"></section>
            <section class="green-pepper thirteen"></section>
            <section class="green-pepper fourteen"></section>
            <section class="green-pepper fifteen"></section>
            <section class="green-pepper sixteen"></section>
            <section class="green-pepper seventeen"></section>
            <section class="green-pepper eightteen"></section>
            <section class="green-pepper nineteen"></section>
            <section class="green-pepper twenty"></section>
            <section class="green-pepper twenty-one"></section>
          </>
        )}

        {mush && (
          <>
            <section class="mushroomyy one">
              <div class="cap">1</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy two">
              <div class="cap">2</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy three">
              <div class="cap">3</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy four">
              <div class="cap">4</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy five">
              <div class="cap">5</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy six">
              <div class="cap">6</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy seven">
              <div class="cap">7</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy eight">
              <div class="cap">8</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy nine">
              <div class="cap">9</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy ten">
              <div class="cap">10</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy eleven">
              <div class="cap">11</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy twelve">
              <div class="cap">12</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy thirteen">
              <div class="cap">13</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy fourteen">
              <div class="cap">14</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy fifteen">
              <div class="cap">15</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy sixteen">
              <div class="cap">16</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy seventeen">
              <div class="cap">17</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy eighteen">
              <div class="cap">18</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy nineteen">
              <div class="cap">19</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy twenty">
              <div class="cap">20</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy twenty-one">
              <div class="cap">21</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy twenty-two">
              <div class="cap">22</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy twenty-three">
              <div class="cap">23</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy twenty-four">
              <div class="cap">24</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy twenty-five">
              <div class="cap">25</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy twenty-six">
              <div class="cap">26</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy twenty-seven">
              <div class="cap">27</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy twenty-eight">
              <div class="cap">28</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy twenty-nine">
              <div class="cap">29</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy thirty">
              <div class="cap">30</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy thirty-one">
              <div class="cap">31</div>
              <div class="stem"></div>
            </section>

            <section class="mushroomyy thirty-two">
              <div class="cap">31</div>
              <div class="stem"></div>
            </section>
          </>
        )}

        {pepp && (
          <>
            <section class="pep one">1</section>
            <section class="pep two">2</section>
            <section class="pep three">3</section>
            <section class="pep four">4</section>
            <section class="pep five">5</section>
            <section class="pep six">6</section>
            <section class="pep seven">7</section>
            <section class="pep eight">8</section>
            <section class="pep nine">9</section>
            <section class="pep ten">10</section>
            <section class="pep eleven">11</section>
            <section class="pep twelve">12</section>
            <section class="pep thirteen">13</section>
            <section class="pep fourteen">14</section>
            <section class="pep fifteen">15</section>
            <section class="pep sixteen">16</section>
            <section class="pep seventeen">17</section>
            <section class="pep eightteen">18</section>
            <section class="pep nineteen">19</section>
            <section class="pep twenty">20</section>
            <section class="pep twenty-one">21</section>
            <section class="pep twenty-two">22</section>
            <section class="pep twenty-three">23</section>
            <section class="pep twenty-four">24</section>
            <section class="pep twenty-five">25</section>
            <section class="pep twenty-six">26</section>
            <section class="pep twenty-seven">27</section>
            <section class="pep twenty-eight">28</section>
            <section class="pep twenty-nine">29</section>
            <section class="pep thirty">30</section>
            <section class="pep thirty-one">31</section>
            <section class="pep thirty-three">33</section>
          </>
        )}

        <section class="crust crust-gluten-free">
          {crustt && (
            <>
              <section class="cheese"></section>
            </>
          )}

          {whitsauce && (
            <>
              <section class="sauceyy sauceyy-white"></section>
            </>
          )}
        </section>
      </div>
      <p id="crumbs">&there4;</p>
    </>
  );
};

export default BuildPizza;
