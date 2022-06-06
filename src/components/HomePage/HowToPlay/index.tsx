import React from "react";

type Props = {};

export default function HowToPlay({}: Props) {
  return (
    <div className="how-to-play my-5">
      <div className="text-center cl-w fnt-b fnt-s5">HOW TO PLAY</div>
      <div className="fnt-s1 cl-w text-center my-4">
        This will be one of the new updated features on Marketplace in mid-June.
        Lottery Lucky with the feature of winning lottery numbers through the
        Chain Link system, Let's explore with us!. Explore this feature with us!
      </div>
      <div className="cl-yl fnt-b fnt-s3">Participation requirements</div>
      <div className="cl-w fnt-s1">
        There is an e-wallet using the Binance Smart Chain network and the
        wallet can get Impot tokens HERA & HEGEM.
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-md-6 px-0">
            <div className="cl-yl fnt-b fnt-s3">Content</div>
            <section>
              <div className="cl-w fnt-s1 fnt-b">Ticket to join</div>
              <ul>
                <li>User can buy for themselves 1 or more Lottery tickets.</li>
                <li>
                  Each ticket has 4 natural numbers, a set of numbers from 0 to
                  9. User can choose numbers for themselves or for the system to
                  choose those 4 numbers themselves
                </li>
                <div className="cl-r">
                  *For example, the user's ticket will have the following
                  numbers: 0 - 1 - 2 - 3
                </div>
              </ul>
            </section>
            <section>
              <div className="cl-w fnt-s1 fnt-b">Pool lottery</div>
              <ul>
                <li>
                  POOL LOTTERY will be opened 4 times a month, 7 days each time
                </li>
                <li>
                  The system will specifically display how many HERA and HEGEM
                  each prize will get per Pool based on the total available
                  prizes of POOL (automatically updated when there is a change
                  in the total prize over time).
                </li>
                <li>
                  The winner is the owner of the Ticket whose number sequence
                  matches the number given by the system
                </li>
                <li>
                  The total prizes that players will receive in the periods are
                  as follows
                </li>
              </ul>
            </section>
            <div className="cl-yl fnt-b fnt-s3">Reward</div>
            <section>
              <ul>
                <li>
                  The winning number will be announced in the Rewards section
                  and on social channels
                </li>
                <li>
                  If the user wins the prize, the prize will be claimed on the
                  Reward section on the page
                </li>
                <li>
                  In case more than 1 person wins the same prize, that prize
                  will be divided equally among all ticket holders that win that
                  prize.
                </li>
              </ul>
            </section>
          </div>
          <div className="col-md-6 px-0">
            <ul>
              <li>Ticket price: 5000 HEGEM/Ticket</li>
              <li>
                Each period, the ticket price will be updated at the beginning
                of the period and will not change in that period.
              </li>
              <li>
                Prizes per period: 60% of HEGEM per Pool, 40% of each Pool will
                be burned + 5000 HERA
              </li>
              <li>
                In case there is no winner in the period, the prize will be
                accumulated to the next period.
              </li>
              <li>
                Specifically: Next period's prize = Number of HERA + HEGEM
                remaining of previous period's Pool + 60% of next period's Pool
                + 5000 HERA from HERO ARENA
              </li>
              <li>
                The period will open and sell Tickets at 0:00 UTC on the first
                day, end at 23:00 UTC on every Saturday and announce the winning
                numbers at 23:30 UTC on the 7th day A the time of prize opening.
                The new period will open at 0:00 UTC the next day
              </li>
              <li>
                Example: The first Matches 3 prize (the first 3 digits coincide
                with the jackpot number) has a total prize value of 1750 HERA +
                25000 HEGEM, there are 5 people with the first 3 numbers
                matching the jackpot number
              </li>
              <div>
                {`=>`} The prize each person gets will be 350 HERA + 5000 HEGEM
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
